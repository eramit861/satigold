import { TRUST_POINTS } from '../data/content.js'
import './TrustBar.css'

export default function TrustBar() {
    return (
        <div className="sg-trust">
            <ul className="sg-container sg-trust__list" aria-label="Why choose Sati Gold">
                {TRUST_POINTS.map((point) => (
                    <li key={point.label} className="sg-trust__item">
                        <strong className="sg-trust__value">{point.value}</strong>
                        <span className="sg-trust__label">{point.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
