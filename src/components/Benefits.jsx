import { SITE } from '../config/site.js'
import { BENEFITS } from '../data/content.js'
import Icon from './Icon.jsx'
import './Benefits.css'

export default function Benefits() {
    return (
        <section id="benefits" className="sg-section sg-section--cream sg-honeycomb" aria-labelledby="sg-benefits-title">
            <div className="sg-container">
                <header className="sg-section-head">
                    <p className="sg-eyebrow">Benefits</p>
                    <h2 id="sg-benefits-title" className="sg-title">
                        Pure honey, <span className="sg-text-gold">pure health</span>
                    </h2>
                    <p className="sg-lead">
                        A spoonful of Sati Gold every day is a simple, natural way to care for your whole family.{' '}
                        <span className="sg-hindi" lang="hi">{SITE.taglines.hindiSecondary}</span>
                    </p>
                </header>

                <ul className="sg-benefits__grid">
                    {BENEFITS.map((benefit) => (
                        <li key={benefit.title} className="sg-benefit">
                            <span className="sg-benefit__icon">
                                <Icon name={benefit.icon} size={28} />
                            </span>
                            <h3 className="sg-benefit__title">{benefit.title}</h3>
                            <p className="sg-benefit__hindi sg-hindi" lang="hi">{benefit.hindi}</p>
                            <p className="sg-benefit__text">{benefit.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
