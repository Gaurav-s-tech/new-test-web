import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'

// Mount to #root — this is a standalone iframe page
const mountTarget = document.getElementById('root');
if (mountTarget) {
  createRoot(mountTarget).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
