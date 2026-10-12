#!/usr/bin/env node
/**
 * Build the site and force-push the contents of dist/ to the `deploy` branch.
 * Hostinger Git should track branch `deploy` -> public_html.
 *
 * Usage: npm run deploy
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const BRANCH = 'deploy'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

function run(cmd, args, cwd = root, inherit = true) {
    const result = spawnSync(cmd, args, { cwd, stdio: inherit ? 'inherit' : 'pipe', encoding: 'utf8' })
    if (result.status !== 0) {
        process.exit(result.status ?? 1)
    }
    return result
}

const remote = run('git', ['remote', 'get-url', 'origin'], root, false).stdout.trim()

console.log('→ Building site…')
run('npm', ['run', 'build'])

for (const requiredFile of ['index.html', '.htaccess']) {
    if (!fs.existsSync(path.join(dist, requiredFile))) {
        console.error(`Build failed: dist/${requiredFile} missing.`)
        process.exit(1)
    }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'satigold-deploy-'))
console.log(`→ Staging deploy in ${tmp}`)
fs.cpSync(dist, tmp, { recursive: true })

// Never publish SMTP secrets if a local config was copied into dist.
fs.rmSync(path.join(tmp, 'contact-config.php'), { force: true })

run('git', ['init', '-b', BRANCH], tmp)
run('git', ['add', '-A'], tmp)
run('git', ['-c', 'user.name=Sati Gold Deploy', '-c', 'user.email=deploy@satigold.com', 'commit', '-q', '-m', `Deploy ${new Date().toISOString()}`], tmp)
run('git', ['remote', 'add', 'origin', remote], tmp)

console.log(`→ Force-pushing to ${remote} (${BRANCH})…`)
run('git', ['push', '-f', 'origin', BRANCH], tmp)

fs.rmSync(tmp, { recursive: true, force: true })
console.log(`✓ Deploy branch updated. In Hostinger Git: pull branch "${BRANCH}" into public_html.`)
