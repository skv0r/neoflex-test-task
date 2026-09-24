import {Outlet} from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"


const Layout = () => {
    return (
        <div className="flex min-h-svh flex-col">
            <Header />
            <main className="container-app grow shrink-0 pb-7">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;