import './styles/base.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'

const rootElement = document.getElementById('root')
const app = (
    <StrictMode>
        <App />
    </StrictMode>
)

/* Production HTML is prerendered (scripts/prerender.mjs), so hydrate it; in dev the root is empty. */
if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app)
} else {
    createRoot(rootElement).render(app)
}
