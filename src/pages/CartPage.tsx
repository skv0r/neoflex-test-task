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
      <div className="py-12 text-center">
        <p className="mb-4 text-text-muted">Корзина пуста</p>
        <Link to="/" className="font-semibold text-text-secondary">
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
      <ul className="m-0 flex w-full max-w-[633px] list-none flex-col gap-5 p-0">
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

      <aside className="flex h-[120px] w-full max-w-[350px] shrink-0 flex-col justify-between rounded-card bg-surface p-5 shadow-card">
        <div className="flex items-center justify-between text-[17px] font-semibold uppercase text-text-primary">
          <span>Итого</span>
          <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
        </div>
        <button
          type="button"
          className="h-[65px] w-full rounded-[32px] bg-text-button text-[17px] font-semibold text-surface"
        >
          Перейти к оформлению
        </button>
      </aside>
    </div>
  )
}

export default CartPage
