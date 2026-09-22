import { Link } from 'react-router-dom'

const Header = () => {  return (
    <header className="container-app flex justify-between w-full py-3.75">
        <Link to="/" className="font-bold text-text-logo text-[25px] leading-[30px]">QPICK</Link>
        <div className="flex gap-8 items-center">
            <Link to="/favourite"><img src="/fav.svg" alt="favourite" className="size-5.75" /></Link>
            <Link to="/cart"><img src="/cart.svg" alt="cart" className="size-5.75"/></Link>
        </div>
    </header>
  )
}

export default Header;
