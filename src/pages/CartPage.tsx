import Card from '../components/Card/Card'
import { getProductById, type Product } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const CartPage = () => {
    const {
        lines,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        totalPrice,
    } = useCart()

    const cartProducts = lines
        .map((line) => {
            const product = getProductById(line.productId)
            if (!product) return null
            return { product, quantity: line.quantity }
        })
        .filter(
            (entry): entry is { product: Product; quantity: number } =>
                entry != null,
        )

    if (cartProducts.length === 0) {
        return (
            <>
                <h1 className="mb-4 text-[20px] text-text-primary">Корзина</h1>
                <div className="py-12 text-center">
                    <p className="mb-4 text-text-muted">Корзина пуста</p>
                    <Link
                        to="/"
                        className="font-semibold text-text-secondary hover:opacity-80 active:opacity-60"
                    >
                        Перейти в каталог
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <h1 className="mb-4 text-[20px] text-text-primary">Корзина</h1>
            <div className="flex w-full flex-col flex-wrap items-center gap-8 max-[475px]:mb-7 lg:flex-row lg:items-start lg:justify-between">
                <ul className="m-0 flex w-full max-w-[633px] list-none flex-col gap-5 p-0 max-lg:max-w-full">
                    {cartProducts.map(({ product, quantity }) => (
                        <li key={product.id}>
                            <Card
                                variant="cart"
                                item={product}
                                quantity={quantity}
                                onRemove={() => removeItem(product.id)}
                                onIncrement={() => incrementQuantity(product.id)}
                                onDecrement={() => decrementQuantity(product.id)}
                            />
                        </li>
                    ))}
                </ul>

                <aside
                    className="w-full max-w-[350px] shrink-0 overflow-hidden rounded-card bg-surface shadow-card max-lg:max-w-full"
                    aria-label="Итого по заказу"
                >
                    <div className="mb-3.75 flex flex-wrap items-center justify-between px-5 pt-5 text-[17px] font-semibold uppercase text-text-primary">
                        <span className="break-words">Итого</span>
                        <span className="break-words">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <button
                        type="button"
                        className="h-[65px] w-full rounded-b-card rounded-t-4xl bg-text-button text-[17px] font-semibold text-surface hover:brightness-90 active:brightness-75"
                        aria-label="Перейти к оформлению заказа"
                    >
                        Перейти к оформлению
                    </button>
                </aside>
            </div>
        </>
    )
}

export default CartPage
