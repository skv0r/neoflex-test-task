import type { Product } from '../../data/catalog'
import { useCart } from '../../context/CartContext'

type CatalogCardProps = {
    variant?: 'catalog'
    item: Product
}

type CartCardProps = {
    variant: 'cart'
    item: Product
    quantity: number
    onRemove: () => void
    onIncrement: () => void
    onDecrement: () => void
}

type CardProps = CatalogCardProps | CartCardProps

const formatPrice = (value: number) =>
    `${value.toLocaleString('ru-RU')} ₽`

const CatalogCard = ({ item }: { item: Product }) => {
    const { addItem } = useCart()

    return (
        <section className="flex h-101.75 w-87.5 shrink-0 flex-col justify-between rounded-card bg-surface px-5 pb-[26.5px] pt-3.75 text-[17px] shadow-card">
            <img
                src={item.image}
                alt={item.title}
                className="mx-auto h-59.25 w-55 object-contain"
            />
            <div className="flex min-h-18.5 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold leading-5.25 text-text-primary">
                        {item.title}
                    </h3>
                    <div className="flex shrink-0 flex-col items-end leading-tight">
                        <span className="font-semibold text-text-secondary">
                            {formatPrice(item.price)}
                        </span>
                        {item.oldPrice != null && (
                            <span className="text-sm text-text-secondary/60 line-through">
                                {formatPrice(item.oldPrice)}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <img src="/star.png" alt="" className="size-4" aria-hidden />
                        <span className="text-text-muted">{item.rating}</span>
                    </div>
                    <button
                        type="button"
                        className="font-semibold text-text-button"
                        onClick={() => addItem(item.id)}
                    >
                        Купить
                    </button>
                </div>
            </div>
        </section>
    )
}

const CartCard = ({
    item,
    quantity,
    onRemove,
    onIncrement,
    onDecrement,
}: Omit<CartCardProps, 'variant'>) => {
    const lineTotal = item.price * quantity

    return (
        <section className="relative flex w-full flex-wrap rounded-card bg-surface p-4.5 pb-3.75 shadow-card max-[475px]:flex-col max-[475px]:items-center">
            <button
                type="button"
                className="absolute right-5 top-5"
                onClick={onRemove}
                aria-label="Удалить из корзины"
            >
                <img src="/trash.svg" alt="" className="size-6" />
            </button>

            <div className="flex w-36.75 shrink-0 flex-col items-center mr-6">
                <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-34 w-full object-contain mb-4.75"
                />
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="flex size-7.5 items-center justify-center rounded-full bg-text-secondary text-[17px] leading-none text-surface"
                        onClick={onDecrement}
                        aria-label="Уменьшить количество"
                    >
                        −
                    </button>
                    <span className="min-w-4 text-[17px] text-center text-text-button font-semibold ">{quantity}</span>
                    <button
                        type="button"
                        className="flex size-7.5 items-center justify-center rounded-full bg-text-secondary text-[17px] leading-none text-surface"
                        onClick={onIncrement}
                        aria-label="Увеличить количество"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col flex-wrap justify-center mr-20 max-[475px]:mr-0 max-[475px]:w-full max-[475px]:items-center max-[475px]:text-center">
                <h3 className="mb-3 max-w-full break-words text-[17px] font-medium leading-5.25 text-text-primary">
                    {item.title}
                </h3>
                <p className="text-[#aaaaaa] font-semibold text-[15px]">{formatPrice(item.price)}</p>
                <p className="absolute right-5 bottom-3.75 text-[17px] font-semibold text-text-primary max-[475px]:relative max-[475px]:right-auto max-[475px]:bottom-auto max-[475px]:mb-0 max-[475px]:self-center">
                    {formatPrice(lineTotal)}
                </p>
            </div>
        </section>
    )
}

const Card = (props: CardProps) => {
    if (props.variant === 'cart') {
        const { item, quantity, onRemove, onIncrement, onDecrement } = props
        return (
            <CartCard
                item={item}
                quantity={quantity}
                onRemove={onRemove}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
            />
        )
    }

    return <CatalogCard item={props.item} />
}

export default Card
