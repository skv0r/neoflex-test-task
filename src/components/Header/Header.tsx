import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const favCount = 2 // заглушка

const Header = () => {
    const { totalCount } = useCart()

    return (    <header className="container-app flex justify-between w-full py-3.75 mb-7">
        <Link to="/" className="font-bold text-text-logo text-[25px] leading-[30px]">QPICK</Link>
        <div className="flex gap-8 items-center">
            <Link to="/favourite" className="relative inline-block">
                <img src="/fav.svg" alt="favourite" className="size-5.75" />
                {favCount > 0 && (<span className="absolute -top-2 -right-2 text-4.25 flex items-center justify-center text-surface bg-text-secondary size-4.25 rounded-full">{favCount}</span>)}
            </Link>
            <Link to="/cart" className="relative inline-block">
                <img src="/cart.svg" alt="cart" className="size-5.75"/>
                {totalCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex size-4.25 items-center justify-center rounded-full bg-text-secondary text-4.25 text-surface">
                        {totalCount}
                    </span>
                )}
            </Link>
        </div>
    </header>
    )
}

export default Header;
