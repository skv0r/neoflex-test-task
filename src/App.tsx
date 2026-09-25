
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import CatalogPage from './pages/CatalogPage'
import CartPage from './pages/CartPage'
import FavouritePage from './pages/FavouritePage'
import CheckoutPage from './pages/CheckoutPage'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
    {
        path: '',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <CatalogPage/>,
            },
            {
                path: 'cart',
                element: <CartPage/>,
            },
            {
                path: 'favourite',
                element: <FavouritePage/>,
            },
            {
                path: 'checkout',
                element: <CheckoutPage/>,
            },
            {
                path: '*',
                element: <NotFound/>,
            },
        ],
    },
])

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
