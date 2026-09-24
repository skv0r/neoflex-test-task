
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import CatalogPage from "./pages/CatalogPage"
import CartPage from "./pages/CartPage"
import NotFound from "./pages/NotFound"

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout/>, 
        children: [
            {
                path: "/",
                element: <CatalogPage/>
            },
            {
                path: "cart",
                element: <CartPage/>
            },
            {
                path: "*",
                element: <NotFound/>
            },
        ]
    }
])

function App() {
    return ( 
        <RouterProvider router={router}/>
    )
}

export default App;
