import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import '@/styles/styles.scss'
import React from 'react'
import App from './App'
import { UserProvider } from './contexts/userContext'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)