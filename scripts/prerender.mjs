/**
 * Injects the server-rendered app into dist/index.html so crawlers and link
 * previews see the full page without running JavaScript.
 * Runs after `vite build` and `vite build --ssr` (see package.json "build").
 */
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const SSR_DIR = path.join(ROOT_DIR, 'dist-ssr')
const ROOT_PLACEHOLDER = '<div id="root"></div>'

const templatePath = path.join(DIST_DIR, 'index.html')
const template = await readFile(templatePath, 'utf8')

if (!template.includes(ROOT_PLACEHOLDER)) {
    throw new Error(`Could not find ${ROOT_PLACEHOLDER} in dist/index.html`)
}

const { render } = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href)
const appHtml = render()

await writeFile(templatePath, template.replace(ROOT_PLACEHOLDER, `<div id="root">${appHtml}</div>`))
await rm(SSR_DIR, { recursive: true, force: true })

console.log(`Prerendered dist/index.html (${(appHtml.length / 1024).toFixed(1)} KB of HTML)`)
