import { SITE } from '../config/site.js'
import { useEnquiry } from '../context/enquiryContext.js'
import { PURITY_BADGES } from '../data/content.js'
import { telLink, whatsappLink } from '../utils/contact.js'
import Icon from './Icon.jsx'
import './Hero.css'

/* Keep in sync with the hero preload <link> in index.html. */
const HERO_IMAGE = {
    src: '/images/hero-jar.webp',
    srcSet: '/images/hero-jar-480.webp 480w, /images/hero-jar-640.webp 640w, /images/hero-jar.webp 760w',
    sizes: '(max-width: 900px) min(420px, 88vw), 520px',
}

export default function Hero() {
    const { openEnquiry } = useEnquiry()

    return (
        <section id="home" className="sg-hero sg-honeycomb" aria-labelledby="sg-hero-title">
            <div className="sg-container sg-hero__inner">
                <div className="sg-hero__content">
                    <p className="sg-hero__hindi sg-hindi" lang="hi">
                        <Icon name="leaf" size={18} />
                        {SITE.taglines.hindiPrimary}
                    </p>
                    <p className="sg-eyebrow">From the valleys of Uttarakhand</p>
                    <h1 id="sg-hero-title" className="sg-hero__title">
                        Pure Himalayan Honey, <span className="sg-text-gold">straight to your home</span>
                    </h1>
                    <p className="sg-hero__lead">
                        Raw, unfiltered Sati Gold honey from wild Himalayan flowers in Almora. 99.9% pure, with no added
                        sugar and no preservatives. {SITE.taglines.primary} in every spoon.
                    </p>

                    <div className="sg-hero__actions">
                        <button type="button" className="sg-btn sg-btn--primary sg-btn--lg" onClick={() => openEnquiry()}>
                            Order Now
                            <Icon name="arrowRight" size={20} />
                        </button>
                        <a className="sg-btn sg-btn--whatsapp sg-btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                            <Icon name="whatsapp" size={20} />
                            Chat on WhatsApp
                        </a>
                    </div>

                    <ul className="sg-hero__badges">
                        {PURITY_BADGES.map((badge) => (
                            <li key={badge.label} className="sg-hero__badge">
                                <span className="sg-hero__badge-icon">
                                    <Icon name={badge.icon} size={16} />
                                </span>
                                {badge.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sg-hero__media">
                    <div className="sg-hero__frame">
                        <img
                            src={HERO_IMAGE.src}
                            srcSet={HERO_IMAGE.srcSet}
                            sizes={HERO_IMAGE.sizes}
                            width="760"
                            height="892"
                            alt="Sati Gold Pure Honey jar with honeycomb, wild flowers and the Himalayas of Uttarakhand"
                        />
                    </div>

                    <div className="sg-hero__seal">
                        <strong>99.9%</strong>
                        <span>Pure</span>
                        <small>Guaranteed</small>
                    </div>

                    <a className="sg-hero__call" href={telLink()}>
                        <span className="sg-hero__call-icon">
                            <Icon name="phone" size={20} />
                        </span>
                        <span>
                            <small>For order &amp; enquiry</small>
                            <strong>{SITE.contact.phoneDisplay}</strong>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    )
}
