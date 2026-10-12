/**
 * Converts the Sati Gold brand assets into web-optimized images for public/.
 *
 * Usage: npm run images -- /path/to/Sati_Gold_Brand_Assets
 */
import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_DIR = path.resolve(
    process.argv[2] || path.join(process.env.HOME, 'Downloads/Sati_Gold_Brand_Assets'),
)
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images')

const WEBP_OPTIONS = { quality: 80, effort: 6 }

const src = (relativePath) => path.join(SOURCE_DIR, relativePath)

const WEBP_IMAGES = [
    { input: '01_Logo/PNG/Sati_Gold_Logo_Primary_Transparent.png', output: 'logo.webp', width: 220, trim: true },
    { input: '01_Logo/PNG/Sati_Gold_Emblem_Transparent.png', output: 'emblem.webp', width: 200 },
    { input: '02_Jar_Labels/Jar_Front_Label_Without_Contact.png', output: 'jar-label.webp', width: 720 },
    { input: '02_Jar_Labels/Jar_Lid_Sticker_Round_Transparent.png', output: 'lid-sticker.webp', width: 640 },
    { input: '02_Jar_Labels/Jar_Wraparound_Label.png', output: 'wraparound-label.webp', width: 1000 },
    { input: '03_Poster/Sati_Gold_Poster.png', output: 'poster.webp', width: 768 },
    { input: '04_Social_Media/Instagram_Facebook_Post_1080x1080.png', output: 'himalayas-to-home.webp', width: 760 },
    { input: '04_Social_Media/Instagram_Portrait_Post_1080x1350.png', output: 'himalayas-portrait.webp', width: 640 },
]

/** Right half of the website banner: the jar, honeycomb and flowers without baked-in text. */
const HERO_CROP = {
    input: '04_Social_Media/Website_YouTube_Banner_1920x1080.png',
    extract: { left: 1000, top: 0, width: 920, height: 1080 },
    sizes: [
        { output: 'hero-jar.webp', width: 760 },
        { output: 'hero-jar-480.webp', width: 480 },
    ],
}

const OG_IMAGE = {
    input: '04_Social_Media/Website_YouTube_Banner_1920x1080.png',
    output: 'og-image.jpg',
    width: 1200,
    height: 630,
}

const ICONS = [
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
]

const logResult = (name, info) => console.log(`  ${name.padEnd(28)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`)

async function run() {
    await mkdir(IMAGES_DIR, { recursive: true })
    console.log(`Source: ${SOURCE_DIR}\n`)

    for (const image of WEBP_IMAGES) {
        const pipeline = sharp(src(image.input))
        if (image.trim) {
            pipeline.trim()
        }
        const info = await pipeline
            .resize({ width: image.width, withoutEnlargement: true })
            .webp(WEBP_OPTIONS)
            .toFile(path.join(IMAGES_DIR, image.output))
        logResult(image.output, info)
    }

    for (const size of HERO_CROP.sizes) {
        const info = await sharp(src(HERO_CROP.input))
            .extract(HERO_CROP.extract)
            .resize({ width: size.width })
            .webp(WEBP_OPTIONS)
            .toFile(path.join(IMAGES_DIR, size.output))
        logResult(size.output, info)
    }

    const ogInfo = await sharp(src(OG_IMAGE.input))
        .resize({ width: OG_IMAGE.width, height: OG_IMAGE.height, fit: 'cover', position: 'centre' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(IMAGES_DIR, OG_IMAGE.output))
    logResult(OG_IMAGE.output, ogInfo)

    for (const icon of ICONS) {
        await copyFile(src(path.join('06_Website_Icons', icon)), path.join(PUBLIC_DIR, icon))
    }
    console.log(`\n  Copied ${ICONS.length} favicon files to public/`)
}

run().catch((error) => {
    console.error(error)
    process.exit(1)
})
