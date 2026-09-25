import { getProductById, type Product } from '../data/catalog'

type Line = {
    productId: string
    quantity: number
}

export function mapLinesToProducts(lines: Line[]): { product: Product; quantity: number }[] {
    return lines
        .map((line) => {
            const product = getProductById(line.productId)
            if (!product) return null
            return { product, quantity: line.quantity }
        })
        .filter(
            (entry): entry is { product: Product; quantity: number } => entry != null,
        )
}
