import './styles/fonts.css'
import './styles/base.css'
import { hydrate, render } from 'preact'
import App from './App.jsx'

const rootElement = document.getElementById('root')

/* Production HTML is prerendered (scripts/prerender.mjs), so hydrate it; in dev the root is empty. */
if (rootElement.hasChildNodes()) {
    hydrate(<App />, rootElement)
} else {
    render(<App />, rootElement)
}
