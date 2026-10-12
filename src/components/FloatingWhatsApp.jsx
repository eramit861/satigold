import { whatsappLink } from '../utils/contact.js'
import Icon from './Icon.jsx'
import './FloatingWhatsApp.css'

export default function FloatingWhatsApp() {
    return (
        <a
            className="sg-float-wa"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Sati Gold on WhatsApp"
        >
            <Icon name="whatsapp" size={30} />
            <span className="sg-float-wa__label">Chat with us</span>
        </a>
    )
}
