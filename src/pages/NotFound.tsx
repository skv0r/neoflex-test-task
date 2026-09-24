import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="flex min-h-[50svh] flex-col items-center justify-center gap-4 text-center">
            <h1 className="font-bold text-4xl">Страница не найдена</h1>
            <Link
                to="/"
                className="font-semibold text-text-secondary hover:opacity-80 active:opacity-60"
            >
                На главную
            </Link>
        </div>
    )
}

export default NotFound
