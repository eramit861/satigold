/**
 * Page copy. Plain JS (no JSX) so vite.config.js can reuse FAQS for JSON-LD.
 * `icon` values map to keys in src/components/Icon.jsx.
 */

export const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Our Story' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'products', label: 'Shop' },
    { id: 'how-to-order', label: 'How to Order' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
]

export const PURITY_BADGES = [
    { icon: 'noSugar', label: 'No Added Sugar' },
    { icon: 'flask', label: 'No Preservatives' },
    { icon: 'shieldCheck', label: 'No Chemicals' },
    { icon: 'leaf', label: '100% Natural' },
]

export const TRUST_POINTS = [
    { value: '99.9%', label: 'Pure & natural' },
    { value: 'Raw', label: 'Unfiltered honey' },
    { value: '0 g', label: 'Added sugar' },
    { value: 'Almora', label: 'Uttarakhand, India' },
]

export const BENEFITS = [
    {
        icon: 'leaf',
        title: '100% Pure',
        hindi: 'कोई मिलावट नहीं',
        text: 'Nothing added, nothing taken away. Just honey the way the bees made it.',
    },
    {
        icon: 'shieldPlus',
        title: 'Supports Immunity',
        hindi: 'रोग प्रतिरोधक क्षमता बढ़ाने में सहायक',
        text: 'A daily spoonful is a time-honoured way to help your body stay strong through the seasons.',
    },
    {
        icon: 'zap',
        title: 'Natural Energy',
        hindi: 'प्राकृतिक ऊर्जा, दिनभर रखें एक्टिव',
        text: 'Natural sugars give a gentle energy boost, perfect before a walk, workout or a long day.',
    },
    {
        icon: 'sparkles',
        title: 'Good for Skin',
        hindi: 'त्वचा के लिए लाभदायक',
        text: 'Loved in home remedies and face packs for a natural, healthy glow.',
    },
    {
        icon: 'heart',
        title: 'Aids Digestion',
        hindi: 'पाचन को सुधारे',
        text: 'Warm water with honey in the morning helps you feel light and refreshed.',
    },
    {
        icon: 'droplet',
        title: 'Natural Sweetener',
        hindi: 'चीनी का प्राकृतिक विकल्प',
        text: 'A wholesome swap for refined sugar in tea, milk, desserts and smoothies.',
    },
]

/** `price` is in rupees (INR). */
export const PACK_OPTIONS = [
    { size: '250 g', price: 399, note: 'Perfect to try' },
    { size: '500 g', price: 799, note: 'Everyday family pack' },
    { size: '1 kg', price: 1499, note: 'Daily use & gifting' },
]

export const BULK_PACK_OPTION = 'Multiple packs / bulk order'

export const PRODUCT_FEATURES = [
    'Raw, unfiltered honey from wild Himalayan flowers',
    '99.9% pure: no added sugar, syrups or preservatives',
    'Collected and packed in Almora, Uttarakhand',
    'Best before 24 months from packing',
]

export const WAYS_TO_ENJOY = [
    'Warm water & lemon every morning',
    'In tea, milk or kadha instead of sugar',
    'Drizzled on toast, roti, pancakes & fruit',
    'In smoothies, dressings & desserts',
]

export const ORDER_STEPS = [
    {
        icon: 'jar',
        title: 'Choose your pack',
        text: 'Pick 250 g (₹399), 500 g (₹799) or 1 kg (₹1,499), or tell us how many jars you need.',
    },
    {
        icon: 'send',
        title: 'Send your enquiry',
        text: 'Fill the short form and send it on WhatsApp or email. It takes under a minute.',
    },
    {
        icon: 'truck',
        title: 'We confirm & deliver',
        text: 'We confirm availability and delivery charges for your location.',
    },
]

export const GALLERY = [
    {
        src: '/images/poster.webp',
        width: 768,
        height: 1024,
        alt: 'Sati Gold Honey poster: 99.9% pure and natural honey from Uttarakhand',
    },
    {
        src: '/images/himalayas-portrait.webp',
        width: 640,
        height: 800,
        alt: 'Sati Gold Pure Honey jar with honeycomb against Himalayan mountains',
    },
    {
        src: '/images/lid-sticker.webp',
        width: 640,
        height: 653,
        alt: 'Sati Gold round lid sticker: from the valleys of Uttarakhand, 100% pure and natural',
    },
    {
        src: '/images/wraparound-label.webp',
        width: 1000,
        height: 563,
        alt: 'Sati Gold jar label: no added sugar, no preservatives, pure and natural',
    },
]

export const FAQS = [
    {
        question: 'Is Sati Gold honey raw and unfiltered?',
        answer: 'Yes. Sati Gold is raw, unfiltered honey collected from wild Himalayan flowers in Uttarakhand. We do not add sugar, syrups, colours or preservatives.',
    },
    {
        question: 'Where does Sati Gold honey come from?',
        answer: 'Our honey comes from Village Tarari in District Almora, Uttarakhand, where bees forage on wild Himalayan flowers in the clean mountain valleys.',
    },
    {
        question: 'Why has my honey thickened or crystallised?',
        answer: 'Crystallisation is a natural sign of pure, raw honey, especially in cold weather. Place the closed jar in warm (not boiling) water for a few minutes and it will turn liquid again.',
    },
    {
        question: 'What is the shelf life of the honey?',
        answer: 'Best before 24 months from the date of packing. Store the jar tightly closed in a cool, dry place and always use a dry spoon.',
    },
    {
        question: 'Which pack sizes are available?',
        answer: 'Sati Gold Pure Honey is available in 250 g (₹399), 500 g (₹799) and 1 kg (₹1,499) packs. Delivery charges depend on your city. For bulk orders, send us an enquiry on WhatsApp or email.',
    },
    {
        question: 'How do I place an order?',
        answer: 'Click any "Order Now" button, fill in the short form and send it on WhatsApp or email. You can also call or WhatsApp us directly on +91 9536221807.',
    },
    {
        question: 'Do you deliver to my city?',
        answer: 'Share your city and PIN code in the enquiry form or on WhatsApp and we will confirm delivery options and charges for your location.',
    },
]
