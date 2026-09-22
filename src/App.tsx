
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import CatalogPage from "./pages/CatalogPage"

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout/>, 
    children: [
      {
        path: "/",
        element: <CatalogPage/>
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
