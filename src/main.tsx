import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CartProvider from './context/CartContext.tsx'
import FavouriteProvider from './context/FavouriteContext.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CartProvider>
            <FavouriteProvider>
                <App />
            </FavouriteProvider>
        </CartProvider>
    </StrictMode>,
)
