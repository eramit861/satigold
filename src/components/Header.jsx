import { useEffect, useState } from 'react'
import { SITE } from '../config/site.js'
import { useEnquiry } from '../context/enquiryContext.js'
import { NAV_ITEMS } from '../data/content.js'
import useActiveSection from '../hooks/useActiveSection.js'
import Icon from './Icon.jsx'
import './Header.css'

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export default function Header() {
    const { openEnquiry } = useEnquiry()
    const activeId = useActiveSection(SECTION_IDS)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 12)
        /* Next frame, so reading scrollY right after hydration does not force a synchronous layout. */
        const initialFrame = requestAnimationFrame(handleScroll)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            cancelAnimationFrame(initialFrame)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (!isMenuOpen) {
            return undefined
        }
        const handleKeyDown = (event) => event.key === 'Escape' && setIsMenuOpen(false)
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isMenuOpen])

    const closeMenu = () => setIsMenuOpen(false)

    const handleOrderClick = () => {
        closeMenu()
        openEnquiry()
    }

    const headerClasses = ['sg-header', isScrolled && 'is-scrolled', isMenuOpen && 'is-menu-open'].filter(Boolean).join(' ')

    return (
        <header className={headerClasses}>
            <div className="sg-container sg-header__inner">
                <a href="#home" className="sg-header__brand" aria-label={`${SITE.productName}, back to top`} onClick={closeMenu}>
                    <img
                        src="/images/logo.webp"
                        srcSet="/images/logo-100.webp 100w, /images/logo-160.webp 160w, /images/logo.webp 220w"
                        sizes="(max-width: 480px) 80px, 97px"
                        alt={`${SITE.productName} logo`}
                        width="220"
                        height="159"
                        className="sg-header__logo"
                    />
                </a>

                <nav id="sg-primary-nav" className="sg-nav" aria-label="Primary">
                    <ul className="sg-nav__list">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeId === item.id
                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={`sg-nav__link${isActive ? ' is-active' : ''}`}
                                        aria-current={isActive ? 'location' : undefined}
                                        onClick={closeMenu}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className="sg-header__actions">
                    <button type="button" className="sg-btn sg-btn--primary sg-header__order" onClick={handleOrderClick}>
                        Order Now
                    </button>
                    <button
                        type="button"
                        className="sg-header__toggle"
                        aria-expanded={isMenuOpen}
                        aria-controls="sg-primary-nav"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                    >
                        <Icon name={isMenuOpen ? 'close' : 'menu'} />
                    </button>
                </div>
            </div>
        </header>
    )
}
