import { SITE } from '../config/site.js'
import { useEnquiry } from '../context/enquiryContext.js'
import Icon from './Icon.jsx'
import './About.css'

const STORY_POINTS = [
    { icon: 'mountain', title: 'Wild Himalayan flora', text: 'Bees forage freely on mountain wildflowers.' },
    { icon: 'leaf', title: 'Raw & unfiltered', text: 'Packed the natural way to keep its goodness.' },
    { icon: 'shieldCheck', title: 'Zero adulteration', text: 'No sugar, syrups, colours or preservatives.' },
]

export default function About() {
    const { openEnquiry } = useEnquiry()

    return (
        <section id="about" className="sg-section sg-section--white" aria-labelledby="sg-about-title">
            <div className="sg-container sg-about__grid">
                <div className="sg-about__media">
                    <img
                        src="/images/jar-label.webp"
                        srcSet="/images/jar-label-480.webp 480w, /images/jar-label.webp 720w"
                        sizes="(max-width: 960px) min(480px, 92vw), 490px"
                        width="720"
                        height="720"
                        loading="lazy"
                        decoding="async"
                        alt="Sati Gold Pure Honey label: from the pristine valleys of Uttarakhand, 100% pure raw honey"
                    />
                    <p className="sg-about__stamp">
                        <Icon name="mapPin" size={18} />
                        {SITE.address.display}
                    </p>
                </div>

                <div className="sg-about__content">
                    <p className="sg-eyebrow">Our Story</p>
                    <h2 id="sg-about-title" className="sg-title">
                        Honey from the <span className="sg-text-gold">lap of nature</span>
                    </h2>
                    <p className="sg-lead">
                        Sati Gold comes from Village Tarari in District Almora, Uttarakhand. Here our bees forage on wild
                        Himalayan flowers in clean mountain air, far away from pollution and chemicals.
                    </p>
                    <p className="sg-lead">
                        We collect every batch with care and pack it raw and unfiltered, so each jar keeps the natural
                        taste, aroma and goodness of the hills. 100% pure raw honey, direct from our garden to your home.
                    </p>

                    <blockquote className="sg-about__quote sg-hindi" lang="hi">
                        हर बूंद शुद्धता की, हर दिन सेहत की
                    </blockquote>

                    <ul className="sg-about__points">
                        {STORY_POINTS.map((point) => (
                            <li key={point.title} className="sg-about__point">
                                <span className="sg-about__point-icon">
                                    <Icon name={point.icon} size={22} />
                                </span>
                                <strong>{point.title}</strong>
                                <span>{point.text}</span>
                            </li>
                        ))}
                    </ul>

                    <button type="button" className="sg-btn sg-btn--outline" onClick={() => openEnquiry()}>
                        Send an Enquiry
                        <Icon name="arrowRight" size={18} />
                    </button>
                </div>
            </div>
        </section>
    )
}
