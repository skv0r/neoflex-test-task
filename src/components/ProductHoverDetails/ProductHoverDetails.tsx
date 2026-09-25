import { type ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Product } from '../../data/catalog'
import { formatPrice } from '../../utils/formatPrice'

const HOVER_DELAY_MS = 1500

const DETAIL_DESCRIPTION = 'ОЧЕНЬ ПОДРОБНОЕ ОПИСАНИЕ'

type ProductHoverDetailsProps = {
    item: Product
    children: ReactNode
}

const ProductHoverDetails = ({ item, children }: ProductHoverDetailsProps) => {
    const [open, setOpen] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const titleId = `product-hover-title-${item.id}`

    function clearHoverTimer() {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    function handleEnter() {
        clearHoverTimer()
        setWaiting(true)
        timerRef.current = setTimeout(() => {
            setOpen(true)
            setWaiting(false)
            timerRef.current = null
        }, HOVER_DELAY_MS)
    }

    function handleLeave() {
        clearHoverTimer()
        setWaiting(false)
        setOpen(false)
    }

    useEffect(() => () => clearHoverTimer(), [])

    const overlay = open
        ? createPortal(
            <>
                <div
                    className="product-hover-backdrop fixed inset-0 z-40 bg-black/50 pointer-events-none"
                    aria-hidden
                />
                <div
                    className="product-hover-panel pointer-events-none fixed left-1/2 top-1/2 z-50 w-[min(100%-2rem,40rem)] max-h-[min(85vh,32rem)] overflow-hidden rounded-card bg-surface shadow-card"
                    role="region"
                    aria-labelledby={titleId}
                >
                    <div className="flex max-h-[min(85vh,32rem)] flex-col gap-4 p-6 sm:flex-row sm:items-start">
                        <img
                            src={item.image}
                            alt=""
                            className="mx-auto h-44 w-full max-w-55 shrink-0 object-contain sm:h-52 sm:w-55"
                            aria-hidden
                        />
                        <div className="flex min-h-0 min-w-0 flex-1 flex-col text-[17px]">
                            <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                                <h3
                                    id={titleId}
                                    className="font-semibold leading-5.25 text-text-primary"
                                >
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
                            <div className="mb-3 flex items-center gap-2.5">
                                <img src="/star.png" alt="" className="size-4" aria-hidden />
                                <span className="text-text-muted">{item.rating}</span>
                            </div>
                            <p className="min-h-0 flex-1 overflow-y-auto text-[15px] leading-relaxed text-text-muted">
                                {DETAIL_DESCRIPTION}
                            </p>
                        </div>
                    </div>
                </div>
            </>,
            document.body,
        )
        : null

    return (
        <div
            className="relative w-87.5 shrink-0"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {children}

            {waiting && !open && (
                <div
                    className="pointer-events-none absolute inset-x-5 bottom-3 h-0.5 overflow-hidden rounded-full bg-text-secondary/15"
                    aria-hidden
                >
                    <span className="product-hover-progress block h-full bg-text-secondary/70" />
                </div>
            )}

            {overlay}
        </div>
    )
}

export default ProductHoverDetails
