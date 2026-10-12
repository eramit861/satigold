import { GALLERY } from '../data/content.js'
import './Gallery.css'

export default function Gallery() {
    return (
        <section className="sg-section sg-section--cream sg-gallery" aria-labelledby="sg-gallery-title">
            <div className="sg-container">
                <header className="sg-section-head">
                    <p className="sg-eyebrow">Gallery</p>
                    <h2 id="sg-gallery-title" className="sg-title">
                        From our hives <span className="sg-text-gold">to your home</span>
                    </h2>
                </header>

                <ul className="sg-gallery__grid">
                    {GALLERY.map((image) => (
                        <li key={image.src} className="sg-gallery__item">
                            <img
                                src={image.src}
                                width={image.width}
                                height={image.height}
                                alt={image.alt}
                                loading="lazy"
                                decoding="async"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
