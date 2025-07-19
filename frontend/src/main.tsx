import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { themeClass } from './components/Common/styles/theme.css.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className={themeClass}>
      <App />
    </div>
  </StrictMode>
)
