export type Product = {
    id: string
    title: string
    price: number
    oldPrice?: number
    rating: number
    image: string
}

export const headphones: Product[] = [
    {
        id: '1',
        title: 'Apple BYZ S852I',
        price: 2927,
        oldPrice: 3527,
        rating: 4.7,
        image: '/byz.png',
    },
    {
        id: '2',
        title: 'Apple EarPods',
        price: 2327,
        rating: 4.5,
        image: '/earpods.png',
    },
    {
        id: '3',
        title: 'Apple EarPods',
        price: 2327,
        rating: 4.5,
        image: '/earpods-packed.png',
    },
    {
        id: '4',
        title: 'Apple BYZ S852I',
        price: 2927,
        oldPrice: 3527,
        rating: 4.7,
        image: '/byz.png',
    },
    {
        id: '5',
        title: 'Apple EarPods',
        price: 2327,
        rating: 4.5,
        image: '/earpods.png',
    },
    {
        id: '6',
        title: 'Apple EarPods',
        price: 2327,
        rating: 4.5,
        image: '/earpods-packed.png',
    },
]

export const wirelessHeadphones: Product[] = [
    {
        id: '7',
        title: 'Apple AirPods',
        price: 9527,
        rating: 4.7,
        image: '/opencasepods.png',
    },
    {
        id: '8',
        title: 'GERLAX GH-04',
        price: 6527,
        rating: 4.7,
        image: '/casepods.png',
    },
    {
        id: '9',
        title: 'BOROFONE BO4',
        price: 7527,
        rating: 4.7,
        image: '/beats.png',
    },
]

export const allProducts: Product[] = [...headphones, ...wirelessHeadphones]

export function getProductById(id: string): Product | undefined {
    return allProducts.find((product) => product.id === id)
}
