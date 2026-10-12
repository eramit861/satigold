import { FAQS } from '../data/content.js'
import Icon from './Icon.jsx'
import './Faq.css'

export default function Faq() {
    return (
        <section id="faq" className="sg-section sg-section--white" aria-labelledby="sg-faq-title">
            <div className="sg-container">
                <header className="sg-section-head">
                    <p className="sg-eyebrow">FAQ</p>
                    <h2 id="sg-faq-title" className="sg-title">
                        Questions <span className="sg-text-gold">we often hear</span>
                    </h2>
                </header>

                <div className="sg-faq__list">
                    {FAQS.map((faq, index) => (
                        <details key={faq.question} className="sg-faq__item" open={index === 0}>
                            <summary className="sg-faq__question">
                                {faq.question}
                                <Icon name="chevronDown" size={20} className="sg-faq__chevron" />
                            </summary>
                            <p className="sg-faq__answer">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}
