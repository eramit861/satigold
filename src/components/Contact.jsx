import { SITE } from '../config/site.js'
import { useEnquiry } from '../context/enquiryContext.js'
import { mailLink, telLink, whatsappLink } from '../utils/contact.js'
import Icon from './Icon.jsx'
import './Contact.css'

const CONTACT_METHODS = [
    { icon: 'phone', label: 'Call us', value: SITE.contact.phoneDisplay, href: telLink() },
    { icon: 'whatsapp', label: 'WhatsApp', value: SITE.contact.phoneDisplay, href: whatsappLink(), isExternal: true },
    { icon: 'mail', label: 'Email', value: SITE.contact.email, href: mailLink() },
    { icon: 'mapPin', label: 'Address', value: SITE.address.display, href: SITE.address.mapsUrl, isExternal: true },
]

export default function Contact() {
    const { openEnquiry } = useEnquiry()

    return (
        <section id="contact" className="sg-section sg-section--cream sg-honeycomb" aria-labelledby="sg-contact-title">
            <div className="sg-container sg-contact__grid">
                <div className="sg-contact__info">
                    <p className="sg-eyebrow">Contact</p>
                    <h2 id="sg-contact-title" className="sg-title">
                        For order <span className="sg-text-gold">&amp; enquiry</span>
                    </h2>
                    <p className="sg-lead">
                        Have a question about our honey, bulk orders or delivery? Reach us on any of these channels.
                    </p>

                    <address className="sg-contact__methods">
                        {CONTACT_METHODS.map((method) => (
                            <a
                                key={method.label}
                                className="sg-contact__method"
                                href={method.href}
                                {...(method.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                                <span className={`sg-contact__icon sg-contact__icon--${method.icon}`}>
                                    <Icon name={method.icon} size={22} />
                                </span>
                                <span>
                                    <small>{method.label}</small>
                                    <strong>{method.value}</strong>
                                </span>
                            </a>
                        ))}
                    </address>
                </div>

                <div className="sg-contact__card">
                    <img src="/images/emblem.webp" width="200" height="214" alt="" loading="lazy" decoding="async" className="sg-contact__emblem" />
                    <h3 className="sg-contact__card-title">Place your order</h3>
                    <p className="sg-contact__card-text">
                        Fill a quick form and send it to us on WhatsApp or email. We will confirm the price, availability
                        and delivery for your location.
                    </p>
                    <div className="sg-contact__card-actions">
                        <button type="button" className="sg-btn sg-btn--primary sg-btn--lg sg-btn--block" onClick={() => openEnquiry()}>
                            Send an Enquiry
                            <Icon name="send" size={18} />
                        </button>
                        <a className="sg-btn sg-btn--outline-light sg-btn--lg sg-btn--block" href={telLink()}>
                            <Icon name="phone" size={18} />
                            Call Now
                        </a>
                    </div>
                    <p className="sg-contact__made-in">Made in Uttarakhand &middot; From the lap of nature</p>
                </div>
            </div>
        </section>
    )
}
