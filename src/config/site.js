/**
 * Single source of truth for business details.
 * Used by the React app AND by vite.config.js (meta tags, JSON-LD, robots.txt, sitemap.xml).
 * Keep this file free of JSX so it can be imported from Node.
 */
export const SITE = {
    name: 'Sati Gold',
    productName: 'Sati Gold Pure Honey',
    url: 'https://satigold.com',
    locale: 'en_IN',
    language: 'en-IN',
    themeColor: '#243B21',

    title: 'Sati Gold Pure Honey | Raw Himalayan Honey from Almora, Uttarakhand',
    description:
        'Buy Sati Gold Pure Honey: 99.9% pure, raw and unfiltered honey from wild Himalayan flowers in Almora, Uttarakhand. No added sugar, no preservatives. Order on WhatsApp: +91 9536221807.',
    keywords: [
        'Sati Gold honey',
        'pure honey',
        'raw honey',
        'Himalayan honey',
        'Uttarakhand honey',
        'Almora honey',
        'pahadi honey',
        'organic honey India',
        'unfiltered honey',
        'natural honey no added sugar',
        'buy honey online India',
        'शुद्ध शहद',
    ],
    ogImage: '/images/og-image.jpg',
    ogImageAlt: 'Sati Gold Pure Honey jar with honeycomb and Himalayan flowers in Uttarakhand',

    taglines: {
        primary: "Nature's Sweetest Blessing",
        secondary: 'Pure Honey, Pure Health',
        hindiPrimary: 'प्रकृति की देन, सेहत का वरदान',
        hindiSecondary: 'शुद्ध शहद, स्वस्थ जीवन',
    },

    contact: {
        email: 'orders@satigold.com',
        phoneDisplay: '+91 95362 21807',
        phoneE164: '+919536221807',
        whatsappNumber: '919536221807',
    },

    address: {
        locality: 'Village Tarari',
        district: 'Almora',
        region: 'Uttarakhand',
        regionCode: 'IN-UT',
        country: 'IN',
        display: 'Village Tarari, District Almora, Uttarakhand',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tarari%2C+Almora%2C+Uttarakhand',
    },
}

/** PHP endpoint on Hostinger (public/contact.php) that emails enquiries via SMTP. */
export const ENQUIRY_ENDPOINT = '/contact.php'

export const absoluteUrl = (pathname = '/') => new URL(pathname, SITE.url).href
