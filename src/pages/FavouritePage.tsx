import { useMemo, useState } from 'react'
import Card from '../components/Card/Card'
import OrderSummary from '../components/OrderSummary/OrderSummary'
import { useCart } from '../context/CartContext'
import { useFavourite } from '../context/FavouriteContext'
import { mapLinesToProducts } from '../utils/mapLinesToProducts'
import { Link } from 'react-router-dom'

const FavouritePage = () => {
    const { addLines } = useCart()
    const {
        lines,
        removeItem,
        removeItems,
        incrementQuantity,
        decrementQuantity,
    } = useFavourite()

    const favouriteProducts = mapLinesToProducts(lines)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        () => new Set(favouriteProducts.map(({ product }) => product.id)),
    )

    const selectedProducts = useMemo(
        () => favouriteProducts.filter(({ product }) => selectedIds.has(product.id)),
        [favouriteProducts, selectedIds],
    )

    const selectedTotalPrice = useMemo(
        () =>
            selectedProducts.reduce(
                (sum, { product, quantity }) => sum + product.price * quantity,
                0,
            ),
        [selectedProducts],
    )

    function toggleSelected(productId: string) {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (next.has(productId)) {
                next.delete(productId)
            } else {
                next.add(productId)
            }
            return next
        })
    }

    function handleAddToCart() {
        const toMove = selectedProducts.map(({ product, quantity }) => ({
            productId: product.id,
            quantity,
        }))
        addLines(toMove)
        removeItems(toMove.map((line) => line.productId))
        setSelectedIds(new Set())
    }

    if (favouriteProducts.length === 0) {
        return (
            <>
                <h1 className="mb-4 text-[20px] text-text-primary">Избранное</h1>
                <div className="py-12 text-center">
                    <p className="mb-4 text-text-muted">В избранном пока пусто</p>
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
            <h1 className="mb-4 text-[20px] text-text-primary">Избранное</h1>
            <div className="flex w-full flex-col flex-wrap items-center gap-8 max-[475px]:mb-7 lg:flex-row lg:items-start lg:justify-between">
                <ul className="m-0 flex w-full max-w-158.25 list-none flex-col gap-5 p-0 max-lg:max-w-full">
                    {favouriteProducts.map(({ product, quantity }) => (
                        <li key={product.id} className="flex items-center gap-4">
                            <div className="min-w-0 flex-1">
                                <Card
                                    variant="cart"
                                    item={product}
                                    quantity={quantity}
                                    onRemove={() => {
                                        removeItem(product.id)
                                        setSelectedIds((prev) => {
                                            const next = new Set(prev)
                                            next.delete(product.id)
                                            return next
                                        })
                                    }}
                                    onIncrement={() => incrementQuantity(product.id)}
                                    onDecrement={() => decrementQuantity(product.id)}
                                />
                            </div>
                            <label className="flex shrink-0 cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    className="size-5 accent-text-secondary"
                                    checked={selectedIds.has(product.id)}
                                    onChange={() => toggleSelected(product.id)}
                                    aria-label={`Выбрать ${product.title} для добавления в корзину`}
                                />
                            </label>
                        </li>
                    ))}
                </ul>

                <OrderSummary
                    totalPrice={selectedTotalPrice}
                    ariaLabel="Итого по выбранным товарам"
                    footer={
                        <button
                            type="button"
                            className="h-16.25 w-full rounded-b-card rounded-t-4xl bg-text-button text-[17px] font-semibold text-surface hover:brightness-90 active:brightness-75 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={selectedProducts.length === 0}
                            onClick={handleAddToCart}
                        >
                            Добавить в корзину
                        </button>
                    }
                />
            </div>
        </>
    )
}

export default FavouritePage
