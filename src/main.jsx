import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'

import { CartProvider } from './context/CartProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { WishlistProvider } from './context/WishlistProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
           <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: '#fce7f3',
              color: '#831843',
              fontWeight: 'bold',
            },
          },
          error: {
            style: {
              background: '#fee2e2',
              color: '#991b1b',
              fontWeight: 'bold',
            },
          },
        }}
      />
          <App />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
