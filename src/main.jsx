import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context.jsx'
import { CartProviderWrapper } from './context/cart.context.jsx'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <AuthProviderWrapper>
          <CartProviderWrapper>
            <App />
          </CartProviderWrapper>
        </AuthProviderWrapper>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
