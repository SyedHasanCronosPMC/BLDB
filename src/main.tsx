import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { initializeDatabase } from './utils/initializeDatabase'

// Initialize database on app start
initializeDatabase()
  .then(success => {
    if (success) {
      console.log('Database initialized successfully');
    } else {
      console.error('Database initialization failed');
    }
  });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)