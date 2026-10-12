import { SITE } from '../config/site.js'
import { useEnquiry } from '../context/enquiryContext.js'
import { ORDER_STEPS } from '../data/content.js'
import { telLink } from '../utils/contact.js'
import Icon from './Icon.jsx'
import './HowToOrder.css'

export default function HowToOrder() {
    const { openEnquiry } = useEnquiry()

    return (
        <section id="how-to-order" className="sg-section sg-section--green sg-order" aria-labelledby="sg-order-title">
            <div className="sg-container">
                <header className="sg-section-head">
                    <p className="sg-eyebrow">How to Order</p>
                    <h2 id="sg-order-title" className="sg-title">
                        Order in <span className="sg-text-gold">three simple steps</span>
                    </h2>
                    <p className="sg-lead">No account, no checkout. Just tell us what you need and we take care of the rest.</p>
                </header>

                <ol className="sg-order__steps">
                    {ORDER_STEPS.map((step, index) => (
                        <li key={step.title} className="sg-order__step">
                            <span className="sg-order__number" aria-hidden="true">{index + 1}</span>
                            <span className="sg-order__icon">
                                <Icon name={step.icon} size={30} />
                            </span>
                            <h3 className="sg-order__title">{step.title}</h3>
                            <p className="sg-order__text">{step.text}</p>
                        </li>
                    ))}
                </ol>

                <div className="sg-order__actions">
                    <button type="button" className="sg-btn sg-btn--primary sg-btn--lg" onClick={() => openEnquiry()}>
                        Start Your Order
                        <Icon name="arrowRight" size={20} />
                    </button>
                    <a className="sg-btn sg-btn--outline-light sg-btn--lg" href={telLink()}>
                        <Icon name="phone" size={20} />
                        Call {SITE.contact.phoneDisplay}
                    </a>
                </div>
            </div>
        </section>
    )
}
