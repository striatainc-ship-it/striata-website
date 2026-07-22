import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { preloadRoute } from './routeLoaders'

const container = document.getElementById('root')

const tree = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)

// Prerendered pages ship with real markup inside #root, so hydrate them
// instead of throwing the server HTML away. `vite dev` serves an empty #root,
// which falls back to a normal client render.
if (container.hasChildNodes()) {
  preloadRoute(window.location.pathname).then(() => hydrateRoot(container, tree))
} else {
  createRoot(container).render(tree)
}
