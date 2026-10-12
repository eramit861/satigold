<?php
declare(strict_types=1);

/**
 * Enquiry endpoint for the Sati Gold sales page (Hostinger).
 * Receives JSON from the enquiry popup and sends it through Hostinger SMTP
 * (Hostinger often blocks PHP mail()).
 *
 * Credentials live in contact-config.php next to this file (never committed).
 * Copy contact-config.example.php from the repo root to public_html/contact-config.php.
 */

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 600;

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

if (!is_same_origin()) {
    respond(403, false, 'Invalid request origin.');
}

$input = read_input();

// Honeypot: bots fill the hidden "website" field; pretend success.
if (!empty($input['website']) || !empty($input['_honey'])) {
    respond(200, true, 'Thank you.');
}

$configFile = __DIR__ . '/contact-config.php';
if (!is_readable($configFile)) {
    respond(500, false, 'Email is not configured on the server.');
}

/** @var array{to:string,from_email:string,from_name:string,smtp_host:string,smtp_port:int,smtp_secure:string,smtp_user:string,smtp_pass:string} $config */
$config = require $configFile;

if (is_rate_limited()) {
    respond(429, false, 'Too many enquiries. Please try again later or contact us on WhatsApp.');
}

$field = static fn (string $key, int $max): string => mb_substr(trim((string) ($input[$key] ?? '')), 0, $max);

$name = $field('name', 120);
$phone = $field('phone', 30);
$email = $field('email', 160);
$city = $field('city', 120);
$pack = $field('pack', 60);
$quantity = $field('quantity', 6);
$message = $field('message', 4000);

$phoneDigits = preg_replace('/\D/', '', $phone) ?? '';
if ($name === '' || strlen($phoneDigits) < 10 || strlen($phoneDigits) > 13) {
    respond(422, false, 'Please enter your name and a valid mobile number.');
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Please enter a valid email address.');
}

$lines = [
    'Name' => $name,
    'Phone' => $phone,
    'Email' => $email,
    'City / PIN' => $city,
    'Pack size' => $pack,
    'Quantity' => $quantity,
];
$body = "New honey enquiry from the Sati Gold website\n\n";
foreach ($lines as $label => $value) {
    if ($value !== '') {
        $body .= "{$label}: {$value}\n";
    }
}
if ($message !== '') {
    $body .= "\nMessage:\n{$message}\n";
}
$body .= "\nWhatsApp the customer: https://wa.me/" . (strlen($phoneDigits) === 10 ? '91' . $phoneDigits : $phoneDigits) . "\n";

$sent = smtp_send([
    'host' => (string) $config['smtp_host'],
    'port' => (int) $config['smtp_port'],
    'secure' => (string) $config['smtp_secure'],
    'user' => (string) $config['smtp_user'],
    'pass' => (string) $config['smtp_pass'],
    'from_email' => (string) $config['from_email'],
    'from_name' => (string) $config['from_name'],
    'to' => (string) $config['to'],
    'reply_to_email' => $email,
    'reply_to_name' => $name,
    'subject' => 'New honey enquiry from ' . $name . ($pack !== '' ? " ({$pack})" : ''),
    'body' => $body,
]);

if (!$sent) {
    respond(502, false, 'Unable to send the enquiry email.');
}

respond(200, true, 'Enquiry sent.');

/* ---------------------------------------------------------------------- */

function respond(int $status, bool $success, string $message): void
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

/** @return array<string, mixed> */
function read_input(): array
{
    $raw = file_get_contents('php://input', false, null, 0, 20000);
    $data = json_decode((string) $raw, true);
    return is_array($data) ? $data : $_POST;
}

function is_same_origin(): bool
{
    $source = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
    if ($source === '') {
        return true;
    }
    $sourceHost = strtolower((string) parse_url($source, PHP_URL_HOST));
    $serverHost = strtolower(explode(':', (string) ($_SERVER['HTTP_HOST'] ?? ''))[0]);
    $strip = static fn (string $host): string => preg_replace('/^www\./', '', $host) ?? $host;
    return $sourceHost !== '' && $strip($sourceHost) === $strip($serverHost);
}

function is_rate_limited(): bool
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $file = sys_get_temp_dir() . '/satigold-enquiry-' . hash('sha256', $ip);
    $now = time();

    $timestamps = is_readable($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [];
    $timestamps = array_values(array_filter($timestamps, static fn ($time): bool => is_int($time) && $time > $now - RATE_LIMIT_WINDOW_SECONDS));

    if (count($timestamps) >= RATE_LIMIT_MAX) {
        return true;
    }

    $timestamps[] = $now;
    @file_put_contents($file, json_encode($timestamps), LOCK_EX);
    return false;
}

/**
 * Minimal SMTP client (AUTH LOGIN) for Hostinger ssl://465 or tls://587.
 *
 * @param array{
 *   host:string,port:int,secure:string,user:string,pass:string,
 *   from_email:string,from_name:string,to:string,
 *   reply_to_email:string,reply_to_name:string,subject:string,body:string
 * } $opts
 */
function smtp_send(array $opts): bool
{
    $secure = strtolower($opts['secure']);
    $timeout = 20;
    $domain = substr((string) strrchr($opts['from_email'], '@'), 1) ?: 'localhost';

    $remote = ($secure === 'ssl' ? 'ssl://' : '') . $opts['host'] . ':' . $opts['port'];
    $errno = 0;
    $errstr = '';
    $fp = @stream_socket_client($remote, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT);
    if (!$fp) {
        error_log("Sati Gold enquiry: SMTP connect failed ({$errno}) {$errstr}");
        return false;
    }

    stream_set_timeout($fp, $timeout);

    $read = static function () use ($fp): string {
        $data = '';
        while (!feof($fp)) {
            $line = fgets($fp, 515);
            if ($line === false) {
                break;
            }
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };

    $expect = static function (string $response, array $codes, string $step): bool {
        $ok = in_array((int) substr($response, 0, 3), $codes, true);
        if (!$ok) {
            error_log("Sati Gold enquiry: SMTP {$step} failed: " . trim($response));
        }
        return $ok;
    };

    $cmd = static function (string $line) use ($fp, $read): string {
        fwrite($fp, $line . "\r\n");
        return $read();
    };

    try {
        if (!$expect($read(), [220], 'greeting') || !$expect($cmd('EHLO ' . $domain), [250], 'EHLO')) {
            return false;
        }

        if ($secure === 'tls') {
            if (!$expect($cmd('STARTTLS'), [220], 'STARTTLS')
                || !stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
                || !$expect($cmd('EHLO ' . $domain), [250], 'EHLO after TLS')) {
                return false;
            }
        }

        if (!$expect($cmd('AUTH LOGIN'), [334], 'AUTH')
            || !$expect($cmd(base64_encode($opts['user'])), [334], 'AUTH user')
            || !$expect($cmd(base64_encode($opts['pass'])), [235], 'AUTH password')
            || !$expect($cmd('MAIL FROM:<' . $opts['from_email'] . '>'), [250], 'MAIL FROM')
            || !$expect($cmd('RCPT TO:<' . $opts['to'] . '>'), [250, 251], 'RCPT TO')
            || !$expect($cmd('DATA'), [354], 'DATA')) {
            return false;
        }

        $headers = [
            'Date: ' . date('r'),
            'From: ' . encode_addr($opts['from_name'], $opts['from_email']),
            'To: <' . $opts['to'] . '>',
            'Subject: ' . encode_header($opts['subject']),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $domain . '>',
        ];
        if ($opts['reply_to_email'] !== '') {
            $headers[] = 'Reply-To: ' . encode_addr($opts['reply_to_name'], $opts['reply_to_email']);
        }

        $data = implode("\r\n", $headers) . "\r\n\r\n" . normalize_body($opts['body']) . "\r\n.";
        if (!$expect($cmd($data), [250], 'message')) {
            return false;
        }

        $cmd('QUIT');
        return true;
    } finally {
        fclose($fp);
    }
}

function encode_addr(string $name, string $email): string
{
    $name = trim(str_replace(["\r", "\n"], '', $name));
    $email = trim(str_replace(["\r", "\n"], '', $email));
    return $name === '' ? '<' . $email . '>' : encode_header($name) . ' <' . $email . '>';
}

function encode_header(string $value): string
{
    $value = str_replace(["\r", "\n"], '', $value);
    return preg_match('/[^\x20-\x7E]/', $value) ? '=?UTF-8?B?' . base64_encode($value) . '?=' : $value;
}

function normalize_body(string $body): string
{
    $body = str_replace(["\r\n", "\r"], "\n", $body);
    $body = str_replace("\n", "\r\n", $body);
    return preg_replace('/^\./m', '..', $body) ?? $body;
}
