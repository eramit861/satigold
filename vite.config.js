import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { SITE, absoluteUrl } from './src/config/site.js'
import { FAQS } from './src/data/content.js'

const escapeHtml = (value) =>
    String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function buildStructuredData() {
    const organizationId = absoluteUrl('/#organization')

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': absoluteUrl('/#website'),
                url: absoluteUrl('/'),
                name: SITE.productName,
                description: SITE.description,
                inLanguage: SITE.language,
                publisher: { '@id': organizationId },
            },
            {
                '@type': 'LocalBusiness',
                '@id': organizationId,
                name: SITE.productName,
                url: absoluteUrl('/'),
                logo: absoluteUrl('/android-chrome-512x512.png'),
                image: absoluteUrl(SITE.ogImage),
                description: SITE.description,
                slogan: SITE.taglines.primary,
                telephone: SITE.contact.phoneE164,
                email: SITE.contact.email,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: SITE.address.locality,
                    addressLocality: SITE.address.district,
                    addressRegion: SITE.address.region,
                    addressCountry: SITE.address.country,
                },
                hasMap: SITE.address.mapsUrl,
                areaServed: { '@type': 'Country', name: 'India' },
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: SITE.contact.phoneE164,
                    email: SITE.contact.email,
                    contactType: 'sales',
                    availableLanguage: ['English', 'Hindi'],
                },
            },
            {
                '@type': 'FAQPage',
                '@id': absoluteUrl('/#faq'),
                mainEntity: FAQS.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                })),
            },
        ],
    }
}

const buildRobots = () => `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`

function buildSitemap() {
    const lastModified = new Date().toISOString().slice(0, 10)
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${absoluteUrl('/')}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${absoluteUrl(SITE.ogImage)}</image:loc>
    </image:image>
  </url>
</urlset>
`
}

function buildManifest() {
    return JSON.stringify(
        {
            name: SITE.productName,
            short_name: SITE.name,
            description: SITE.description,
            start_url: '/',
            display: 'standalone',
            background_color: '#FBF5E6',
            theme_color: SITE.themeColor,
            icons: [
                { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
                { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
            ],
        },
        null,
        4,
    )
}

/** Fills __TOKENS__ in index.html from src/config/site.js and emits robots.txt, sitemap.xml and site.webmanifest. */
function siteSeoPlugin() {
    let isSsrBuild = false

    const tokens = {
        SITE_LANGUAGE: SITE.language,
        SITE_TITLE: escapeHtml(SITE.title),
        SITE_DESCRIPTION: escapeHtml(SITE.description),
        SITE_KEYWORDS: escapeHtml(SITE.keywords.join(', ')),
        SITE_NAME: escapeHtml(SITE.name),
        SITE_PRODUCT_NAME: escapeHtml(SITE.productName),
        SITE_LOCALE: SITE.locale,
        SITE_URL: absoluteUrl('/'),
        THEME_COLOR: SITE.themeColor,
        GEO_REGION: SITE.address.regionCode,
        GEO_PLACENAME: escapeHtml(`${SITE.address.district}, ${SITE.address.region}`),
        OG_IMAGE: absoluteUrl(SITE.ogImage),
        OG_IMAGE_ALT: escapeHtml(SITE.ogImageAlt),
        STRUCTURED_DATA: JSON.stringify(buildStructuredData()).replace(/</g, '\\u003c'),
    }

    return {
        name: 'sati-gold-seo',
        configResolved(config) {
            isSsrBuild = Boolean(config.build.ssr)
        },
        transformIndexHtml: {
            order: 'pre',
            handler: (html) => html.replace(/__([A-Z]+(?:_[A-Z]+)*)__/g, (match, key) => tokens[key] ?? match),
        },
        configureServer(server) {
            const devFiles = {
                '/site.webmanifest': ['application/manifest+json', buildManifest],
                '/robots.txt': ['text/plain', buildRobots],
                '/sitemap.xml': ['application/xml', buildSitemap],
            }
            server.middlewares.use((req, res, next) => {
                const file = devFiles[req.url]
                if (!file) {
                    return next()
                }
                res.setHeader('Content-Type', file[0])
                res.end(file[1]())
            })
        },
        generateBundle() {
            if (isSsrBuild) {
                return
            }
            this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots() })
            this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() })
            this.emitFile({ type: 'asset', fileName: 'site.webmanifest', source: buildManifest() })
        },
    }
}

export default defineConfig({
    plugins: [react(), siteSeoPlugin()],
    build: {
        cssCodeSplit: false,
        assetsInlineLimit: 0,
    },
})
