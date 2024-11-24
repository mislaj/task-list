import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@assets/scss/styles.scss'
// import '@assets/scss/_variables.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
