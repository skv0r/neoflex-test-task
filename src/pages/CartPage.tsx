import Card from '../components/Card/Card'
import OrderSummary from '../components/OrderSummary/OrderSummary'
import { useCart } from '../context/CartContext'
import { mapLinesToProducts } from '../utils/mapLinesToProducts'
import { Link, useNavigate } from 'react-router-dom'

const CartPage = () => {
    const navigate = useNavigate()
    const {
        lines,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        totalPrice,
    } = useCart()

    const cartProducts = mapLinesToProducts(lines)

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
                <ul className="m-0 flex w-full max-w-158.25 list-none flex-col gap-5 p-0 max-lg:max-w-full">
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

                <OrderSummary
                    totalPrice={totalPrice}
                    ariaLabel="Итого по заказу"
                    footer={
                        <button
                            type="button"
                            className="h-16.25 w-full rounded-b-card rounded-t-4xl bg-text-button text-[17px] font-semibold text-surface hover:brightness-90 active:brightness-75"
                            aria-label="Перейти к оформлению заказа"
                            onClick={() => navigate('/checkout', { state: { totalPrice } })}
                        >
                            Перейти к оформлению
                        </button>
                    }
                />
            </div>
        </>
    )
}

export default CartPage
