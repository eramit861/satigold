import About from './components/About.jsx'
import Benefits from './components/Benefits.jsx'
import Contact from './components/Contact.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import EnquiryModal from './components/EnquiryModal.jsx'
import Faq from './components/Faq.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'
import Footer from './components/Footer.jsx'
import Gallery from './components/Gallery.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import HowToOrder from './components/HowToOrder.jsx'
import Products from './components/Products.jsx'
import TrustBar from './components/TrustBar.jsx'
import { EnquiryProvider } from './context/EnquiryProvider.jsx'

export default function App() {
    return (
        <EnquiryProvider>
            <a className="sg-skip-link" href="#main">Skip to content</a>
            <Header />
            <main id="main">
                <Hero />
                <TrustBar />
                <About />
                <Benefits />
                <Products />
                <HowToOrder />
                <Gallery />
                <Faq />
                <CtaBanner />
                <Contact />
            </main>
            <Footer />
            <FloatingWhatsApp />
            <EnquiryModal />
        </EnquiryProvider>
    )
}
