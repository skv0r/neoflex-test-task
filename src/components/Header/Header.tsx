import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useFavourite } from '../../context/FavouriteContext'

const iconLinkClass = 'icon-link relative inline-block'

const iconImgClass = 'size-5.75'

const Header = () => {
    const { totalCount } = useCart()
    const { totalCount: favCount } = useFavourite()

    return (
        <header className="container-app mb-7 flex w-full justify-between py-3.75">
            <Link
                to="/"
                className="text-link inline-block w-fit font-bold text-text-logo text-[25px] leading-7.5 hover:opacity-80 active:opacity-60"
            >
                QPICK
            </Link>
            <nav className="flex items-center gap-8" aria-label="Действия пользователя">
                <Link
                    to="/favourite"
                    className={iconLinkClass}
                    aria-label={favCount > 0 ? `Избранное, ${favCount}` : 'Избранное'}
                >
                    <img src="/fav.svg" alt="" className={iconImgClass} aria-hidden />
                    {favCount > 0 && (
                        <span
                            className="absolute -top-2 -right-2 flex size-4.25 items-center justify-center rounded-full bg-text-secondary text-[11px] text-surface"
                            aria-hidden
                        >
                            {favCount}
                        </span>
                    )}
                </Link>
                <Link
                    to="/cart"
                    className={iconLinkClass}
                    aria-label={totalCount > 0 ? `Корзина, ${totalCount}` : 'Корзина'}
                >
                    <img src="/cart.svg" alt="" className={iconImgClass} aria-hidden />
                    {totalCount > 0 && (
                        <span
                            className="absolute -top-2 -right-2 flex size-4.25 items-center justify-center rounded-full bg-text-secondary text-[11px] text-surface"
                            aria-hidden
                        >
                            {totalCount}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    )
}

export default Header
