import { ENQUIRY_ENDPOINT, SITE } from '../config/site.js'
import { packLabel } from './price.js'

export const DEFAULT_WHATSAPP_MESSAGE = `Hi ${SITE.name}, I would like to know more about your pure honey and its prices.`

export const telLink = () => `tel:${SITE.contact.phoneE164}`

export const mailLink = (subject = `Enquiry: ${SITE.productName}`) =>
    `mailto:${SITE.contact.email}?subject=${encodeURIComponent(subject)}`

export const whatsappLink = (message = DEFAULT_WHATSAPP_MESSAGE) =>
    `https://wa.me/${SITE.contact.whatsappNumber}?text=${encodeURIComponent(message)}`

export const packEnquiryMessage = (pack) =>
    `Hi ${SITE.name}, I would like to order the ${packLabel(pack)} pack of ${SITE.productName}. Please confirm availability and delivery charges.`

const ENQUIRY_LINES = [
    ['Name', 'name'],
    ['Phone', 'phone'],
    ['Email', 'email'],
    ['City / PIN', 'city'],
    ['Pack size', 'pack'],
    ['Quantity', 'quantity'],
    ['Message', 'message'],
]

export function buildEnquiryText(form) {
    const details = ENQUIRY_LINES.filter(([, key]) => String(form[key] ?? '').trim() !== '')
        .map(([label, key]) => `${label}: ${key === 'pack' ? packLabel(form.pack) : String(form[key]).trim()}`)
        .join('\n')

    return `Hi ${SITE.name}, I would like to order ${SITE.productName}.\n\n${details}`
}

/** Sends the enquiry to SITE.contact.email through public/contact.php (Hostinger SMTP). */
export async function sendEnquiryEmail(form) {
    const response = await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            email: form.email,
            city: form.city,
            pack: form.pack,
            quantity: form.quantity,
            message: form.message,
            website: form.website,
        }),
    })

    const result = await response.json().catch(() => ({}))
    if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'Unable to send the enquiry email.')
    }
    return result
}
