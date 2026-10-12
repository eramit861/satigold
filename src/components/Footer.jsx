import { SITE } from '../config/site.js'
import { NAV_ITEMS } from '../data/content.js'
import { mailLink, telLink, whatsappLink } from '../utils/contact.js'
import './Footer.css'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
    return (
        <footer className="sg-footer">
            <div className="sg-container sg-footer__grid">
                <div className="sg-footer__brand">
                    <img src="/images/emblem.webp" width="200" height="214" alt={`${SITE.name} emblem`} loading="lazy" decoding="async" />
                    <div>
                        <p className="sg-footer__name">{SITE.productName}</p>
                        <p className="sg-footer__tagline">{SITE.taglines.primary}</p>
                        <p className="sg-footer__hindi sg-hindi" lang="hi">{SITE.taglines.hindiPrimary}</p>
                    </div>
                </div>

                <nav className="sg-footer__col" aria-label="Footer">
                    <h2 className="sg-footer__heading">Quick Links</h2>
                    <ul className="sg-footer__links">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.id}>
                                <a href={`#${item.id}`}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sg-footer__col">
                    <h2 className="sg-footer__heading">Get in Touch</h2>
                    <ul className="sg-footer__links">
                        <li>
                            <a href={telLink()}>Call: {SITE.contact.phoneDisplay}</a>
                        </li>
                        <li>
                            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                                WhatsApp: {SITE.contact.phoneDisplay}
                            </a>
                        </li>
                        <li>
                            <a href={mailLink()}>{SITE.contact.email}</a>
                        </li>
                        <li>
                            <a href={SITE.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                                {SITE.address.display}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="sg-footer__bottom">
                <div className="sg-container sg-footer__bottom-inner">
                    <p>
                        &copy; <span suppressHydrationWarning>{CURRENT_YEAR}</span> {SITE.name}. All rights reserved.
                    </p>
                    <p className="sg-footer__slogan">{SITE.taglines.secondary}</p>
                </div>
            </div>
        </footer>
    )
}
