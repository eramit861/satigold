<?php
/**
 * Copy this file to public_html/contact-config.php on the Hostinger server
 * (same folder as contact.php) and set the mailbox password.
 * Do NOT commit contact-config.php: it contains the mailbox password.
 *
 * Hostinger: hPanel → Emails → orders@satigold.in
 * SMTP: smtp.hostinger.in · 465 · SSL
 */
declare(strict_types=1);

return [
    'to' => 'orders@satigold.in',
    'from_email' => 'orders@satigold.in',
    'from_name' => 'Sati Gold Website',
    'smtp_host' => 'smtp.hostinger.in',
    'smtp_port' => 465,
    'smtp_secure' => 'ssl', // ssl (465) or tls (587)
    'smtp_user' => 'orders@satigold.in',
    'smtp_pass' => 'REPLACE_WITH_MAILBOX_PASSWORD',
];
