export type CartLine = {
  productId: string
  quantity: number
}

export type CartContextValue = {
  lines: CartLine[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  incrementQuantity: (productId: string) => void
  decrementQuantity: (productId: string) => void
  totalCount: number
  totalPrice: number
}

const CART_STORAGE_KEY = 'qpick-cart'

export function loadCart(): CartLine[] {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY)
  return savedCart ? JSON.parse(savedCart) : []
}

export function saveCart(lines: CartLine[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines))
}
