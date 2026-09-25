export type CartLine = {
    productId: string
    quantity: number
}

export type CartContextValue = {
    lines: CartLine[]
    addItem: (productId: string) => void
    addLines: (lines: CartLine[]) => void
    removeItem: (productId: string) => void
    incrementQuantity: (productId: string) => void
    decrementQuantity: (productId: string) => void
    totalCount: number
    totalPrice: number
}

const CART_STORAGE_KEY = 'qpick-cart'

function isCartLine(value: unknown): value is CartLine {
    if (typeof value !== 'object' || value === null) return false
    const line = value as Record<string, unknown>
    return (
        typeof line.productId === 'string' &&
        typeof line.quantity === 'number' &&
        line.quantity > 0
    )
}

export function loadCart(): CartLine[] {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (!savedCart) return []
        const parsed: unknown = JSON.parse(savedCart)
        if (!Array.isArray(parsed)) return []
        return parsed.filter(isCartLine)
    } catch {
        return []
    }
}

export function saveCart(lines: CartLine[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines))
}
