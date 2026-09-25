import type { ReactNode } from 'react'

type OrderSummaryProps = {
    totalPrice: number
    ariaLabel: string
    footer?: ReactNode
}

const OrderSummary = ({ totalPrice, ariaLabel, footer }: OrderSummaryProps) => {
    return (
        <aside
            className="w-full max-w-87.5 shrink-0 overflow-hidden rounded-card bg-surface shadow-card max-lg:max-w-full"
            aria-label={ariaLabel}
        >
            <div
                className={`flex flex-wrap items-center justify-between px-5 pt-5 text-[17px] font-semibold uppercase text-text-primary ${footer ? 'mb-3.75' : 'pb-5'}`}
            >
                <span className="wrap-break-word">Итого</span>
                <span className="wrap-break-word">{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            {footer}
        </aside>
    )
}

export default OrderSummary
