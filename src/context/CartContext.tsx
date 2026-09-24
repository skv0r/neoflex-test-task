import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProductById } from '../data/catalog'
import { type CartLine, type CartContextValue, loadCart, saveCart } from './cartStorage'
const CartContext = createContext<CartContextValue | null>(null)

export default function CartProvider({ children }: { children: ReactNode }) {
    const [lines, setLines] = useState<CartLine[]>(() => loadCart())

    useEffect(() => {
        saveCart(lines)
    }, [lines])

    function addItem(productId: string) {
        setLines((prev) => {
            const existing = prev.find((line) => line.productId === productId)
            if (existing) {
                return prev.map((line) =>
                    line.productId === productId
                        ? { ...line, quantity: line.quantity + 1 }
                        : line,
                )
            }
            return [...prev, { productId, quantity: 1 }]
        })
    }

    function removeItem(productId: string) {
        setLines((prev) => prev.filter((line) => line.productId !== productId))
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

    const totalPrice = useMemo(() =>
        lines.reduce((sum, line) => {
            const product = getProductById(line.productId)
            return sum + (product?.price ?? 0) * line.quantity
        }, 0), [lines]
    )

    const value: CartContextValue = {
        lines,
        addItem,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        totalCount,
        totalPrice,
    }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components -- хук рядом с провайдером
export function useCart(): CartContextValue {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart нужно вызывать внутри CartProvider')
    return ctx
}

