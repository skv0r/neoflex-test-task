export type FavouriteLine = {
    productId: string
    quantity: number
}

export type FavouriteContextValue = {
    lines: FavouriteLine[]
    toggleItem: (productId: string) => void
    isFavourite: (productId: string) => boolean
    removeItem: (productId: string) => void
    removeItems: (productIds: string[]) => void
    incrementQuantity: (productId: string) => void
    decrementQuantity: (productId: string) => void
    totalCount: number
    totalPrice: number
}

const FAVOURITE_STORAGE_KEY = 'qpick-favourite'

function isFavouriteLine(value: unknown): value is FavouriteLine {
    if (typeof value !== 'object' || value === null) return false
    const line = value as Record<string, unknown>
    return (
        typeof line.productId === 'string' &&
        typeof line.quantity === 'number' &&
        line.quantity > 0
    )
}

export function loadFavourite(): FavouriteLine[] {
    try {
        const saved = localStorage.getItem(FAVOURITE_STORAGE_KEY)
        if (!saved) return []
        const parsed: unknown = JSON.parse(saved)
        if (!Array.isArray(parsed)) return []
        return parsed.filter(isFavouriteLine)
    } catch {
        return []
    }
}

export function saveFavourite(lines: FavouriteLine[]): void {
    localStorage.setItem(FAVOURITE_STORAGE_KEY, JSON.stringify(lines))
}
