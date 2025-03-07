import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './assets/main.css'
import App from './App.jsx'

const root= createRoot(document.getElementById('root'))

root.render(
  <StrictMode >
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
//Es el punto de entrada a nuestra app