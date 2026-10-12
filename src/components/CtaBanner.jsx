import { SITE } from '../config/site.js'
import { useEnquiry } from '../context/enquiryContext.js'
import { whatsappLink } from '../utils/contact.js'
import Icon from './Icon.jsx'
import './CtaBanner.css'

export default function CtaBanner() {
    const { openEnquiry } = useEnquiry()

    return (
        <section className="sg-cta-band" aria-labelledby="sg-cta-title">
            <div className="sg-container sg-cta-band__inner">
                <p className="sg-cta-band__hindi sg-hindi" lang="hi">{SITE.taglines.hindiSecondary}</p>
                <h2 id="sg-cta-title" className="sg-cta-band__title">Taste the purity of the Himalayas</h2>
                <p className="sg-cta-band__text">
                    Bring home a jar of raw Sati Gold honey today, collected and packed with care in Uttarakhand.
                </p>
                <div className="sg-cta-band__actions">
                    <button type="button" className="sg-btn sg-btn--dark sg-btn--lg" onClick={() => openEnquiry()}>
                        Order Now
                        <Icon name="arrowRight" size={20} />
                    </button>
                    <a className="sg-btn sg-btn--whatsapp sg-btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                        <Icon name="whatsapp" size={20} />
                        WhatsApp Us
                    </a>
                </div>
            </div>
        </section>
    )
}
