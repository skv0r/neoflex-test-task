import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProductById } from '../data/catalog'
import {
    type FavouriteLine,
    type FavouriteContextValue,
    loadFavourite,
    saveFavourite,
} from './favouriteStorage'

const FavouriteContext = createContext<FavouriteContextValue | null>(null)

export default function FavouriteProvider({ children }: { children: ReactNode }) {
    const [lines, setLines] = useState<FavouriteLine[]>(() => loadFavourite())

    useEffect(() => {
        saveFavourite(lines)
    }, [lines])

    function toggleItem(productId: string) {
        setLines((prev) => {
            const existing = prev.find((line) => line.productId === productId)
            if (existing) {
                return prev.filter((line) => line.productId !== productId)
            }
            return [...prev, { productId, quantity: 1 }]
        })
    }

    function isFavourite(productId: string) {
        return lines.some((line) => line.productId === productId)
    }

    function removeItem(productId: string) {
        setLines((prev) => prev.filter((line) => line.productId !== productId))
    }

    function removeItems(productIds: string[]) {
        if (productIds.length === 0) return
        const ids = new Set(productIds)
        setLines((prev) => prev.filter((line) => !ids.has(line.productId)))
    }

    function incrementQuantity(productId: string) {
        setLines((prev) =>
            prev.map((line) =>
                line.productId === productId
                    ? { ...line, quantity: line.quantity + 1 }
                    : line,
            ),
        )
    }

    function decrementQuantity(productId: string) {
        setLines((prev) =>
            prev.flatMap((line) => {
                if (line.productId !== productId) return [line]
                if (line.quantity <= 1) return []
                return [{ ...line, quantity: line.quantity - 1 }]
            }),
        )
    }

    const totalCount = lines.reduce((sum, line) => sum + line.quantity, 0)

    const totalPrice = useMemo(
        () =>
            lines.reduce((sum, line) => {
                const product = getProductById(line.productId)
                return sum + (product?.price ?? 0) * line.quantity
            }, 0),
        [lines],
    )

    const value: FavouriteContextValue = {
        lines,
        toggleItem,
        isFavourite,
        removeItem,
        removeItems,
        incrementQuantity,
        decrementQuantity,
        totalCount,
        totalPrice,
    }

    return (
        <FavouriteContext.Provider value={value}>{children}</FavouriteContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavourite(): FavouriteContextValue {
    const ctx = useContext(FavouriteContext)
    if (!ctx) throw new Error('useFavourite нужно вызывать внутри FavouriteProvider')
    return ctx
}
