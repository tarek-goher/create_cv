import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. ضيف السطر ده
import './index.css'
import App from './app.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 2. غلف الـ App هنا */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)