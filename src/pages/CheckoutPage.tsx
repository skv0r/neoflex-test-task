import { Navigate, useLocation } from 'react-router-dom'

type CheckoutLocationState = {
    totalPrice: number
}

const CheckoutPage = () => {
    const location = useLocation()
    const state = location.state as CheckoutLocationState | null
    const totalPrice = state?.totalPrice

    if (totalPrice == null || Number.isNaN(totalPrice)) {
        return <Navigate to="/cart" replace />
    }

    return (
        <>
            <h1 className="mb-4 text-[20px] text-text-primary">Оформление заказа</h1>
            <div className="flex min-h-50 flex-col items-center justify-center gap-6 rounded-card bg-surface py-16 shadow-card">
                <div
                    className="size-12 animate-spin rounded-full border-4 border-page border-t-text-secondary"
                    role="status"
                    aria-label="Загрузка"
                />
                <p className="text-text-muted">Обрабатываем заказ…</p>
                <p className="text-[17px] font-semibold text-text-primary">
                    Сумма: {totalPrice.toLocaleString('ru-RU')} ₽
                </p>
            </div>
        </>
    )
}

export default CheckoutPage
