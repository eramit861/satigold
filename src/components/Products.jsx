import { useState } from 'react'
import { SITE } from '../config/site.js'
import { useEnquiry } from '../context/enquiryContext.js'
import { PACK_OPTIONS, PRODUCT_FEATURES, WAYS_TO_ENJOY } from '../data/content.js'
import { packEnquiryMessage, whatsappLink } from '../utils/contact.js'
import { findPack, formatPrice } from '../utils/price.js'
import Icon from './Icon.jsx'
import './Products.css'

export default function Products() {
    const { openEnquiry } = useEnquiry()
    const [selectedPack, setSelectedPack] = useState(PACK_OPTIONS[1].size)
    const selectedPrice = findPack(selectedPack).price

    return (
        <section id="products" className="sg-section sg-section--white" aria-labelledby="sg-products-title">
            <div className="sg-container">
                <div className="sg-product">
                    <div className="sg-product__media">
                        <img
                            src="/images/himalayas-to-home.webp"
                            srcSet="/images/himalayas-to-home-480.webp 480w, /images/himalayas-to-home-560.webp 560w, /images/himalayas-to-home-680.webp 680w, /images/himalayas-to-home.webp 760w"
                            sizes="(max-width: 960px) min(520px, 92vw), 560px"
                            width="760"
                            height="760"
                            loading="lazy"
                            decoding="async"
                            alt="Sati Gold Pure Honey jar on a wooden board with honeycomb, honey dipper and Himalayan mountains"
                        />
                    </div>

                    <div className="sg-product__content">
                        <p className="sg-eyebrow">Shop</p>
                        <h2 id="sg-products-title" className="sg-title">{SITE.productName}</h2>
                        <p className="sg-product__subtitle">Raw Himalayan honey from Almora, Uttarakhand</p>

                        <ul className="sg-product__features">
                            {PRODUCT_FEATURES.map((feature) => (
                                <li key={feature}>
                                    <span className="sg-product__check">
                                        <Icon name="check" size={14} />
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <fieldset className="sg-packs">
                            <legend className="sg-packs__legend">Choose your pack size</legend>
                            <div className="sg-packs__options">
                                {PACK_OPTIONS.map((pack) => {
                                    const isSelected = selectedPack === pack.size
                                    return (
                                        <label key={pack.size} className={`sg-pack${isSelected ? ' is-selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="sg-pack-size"
                                                value={pack.size}
                                                checked={isSelected}
                                                onChange={() => setSelectedPack(pack.size)}
                                                className="sg-visually-hidden"
                                            />
                                            <span className="sg-pack__size">{pack.size}</span>
                                            <span className="sg-pack__price">{formatPrice(pack.price)}</span>
                                            <span className="sg-pack__note">{pack.note}</span>
                                        </label>
                                    )
                                })}
                            </div>
                        </fieldset>

                        <p className="sg-product__price" aria-live="polite">
                            <strong>
                                {formatPrice(selectedPrice)} <span className="sg-product__price-pack">/ {selectedPack}</span>
                            </strong>
                            Delivery charges depend on your city. We confirm them when you order.
                        </p>

                        <div className="sg-product__actions">
                            <button type="button" className="sg-btn sg-btn--primary sg-btn--lg" onClick={() => openEnquiry(selectedPack)}>
                                Order {selectedPack} Pack
                                <Icon name="arrowRight" size={20} />
                            </button>
                            <a
                                className="sg-btn sg-btn--whatsapp sg-btn--lg"
                                href={whatsappLink(packEnquiryMessage(selectedPack))}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon name="whatsapp" size={20} />
                                Order on WhatsApp
                            </a>
                        </div>

                        <div className="sg-enjoy">
                            <h3 className="sg-enjoy__title">Ways to enjoy</h3>
                            <ul className="sg-enjoy__list">
                                {WAYS_TO_ENJOY.map((way) => (
                                    <li key={way}>
                                        <Icon name="droplet" size={16} />
                                        {way}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
