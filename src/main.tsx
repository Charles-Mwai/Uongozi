import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/AppContext'

// Hide the inline loading spinner the moment React takes over
const loader = document.getElementById('app-loading');
if (loader) {
  loader.style.opacity = '0';
  setTimeout(() => loader.remove(), 320);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
