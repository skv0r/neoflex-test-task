import { useState } from 'react'
import { Link } from 'react-router-dom'

type Language = 'rus' | 'eng'

const footerLinkClass =
    'text-link h-5.25 hover:text-text-secondary active:opacity-80'

const Footer = () => {
    const [language, setLanguage] = useState<Language>('rus')

    return (
        <footer className="container-app flex flex-wrap items-start justify-between gap-6 rounded-t-card bg-surface p-7.25 text-text-button max-[600px]:flex-col max-[600px]:items-center max-[600px]:text-center">
            <Link
                to="/"
                className="text-link inline-block w-fit self-start font-bold text-text-logo text-[25px] leading-7.5 hover:opacity-80 active:opacity-60 max-[600px]:self-center"
            >
                QPICK
            </Link>
            <nav
                className="flex flex-col gap-2.5 max-[600px]:items-center"
                aria-label="Навигация по сайту"
            >
                <Link to="/favourite" className={footerLinkClass}>
                    Избранное
                </Link>
                <Link to="/cart" className={footerLinkClass}>
                    Корзина
                </Link>
                <Link to="/contact" className={footerLinkClass}>
                    Контакты
                </Link>
            </nav>
            <div className="max-[600px]:flex max-[600px]:flex-col max-[600px]:items-center">
                <Link to="/rules" className={footerLinkClass}>
                    Условия сервиса
                </Link>
                <div
                    className="flex items-center gap-4.25 max-[600px]:justify-center"
                    role="group"
                    aria-label="Выбор языка"
                >
                    <img src="/RU.svg" alt="" className="size-5" aria-hidden />
                    <button
                        type="button"
                        className={`hover:text-text-secondary active:opacity-80 ${language === 'rus' ? 'text-text-secondary' : 'text-text-button'}`}
                        aria-pressed={language === 'rus'}
                        onClick={() => setLanguage('rus')}
                    >
                        Рус
                    </button>
                    <button
                        type="button"
                        className={`hover:text-text-secondary active:opacity-80 ${language === 'eng' ? 'text-text-secondary' : 'text-text-button'}`}
                        aria-pressed={language === 'eng'}
                        onClick={() => setLanguage('eng')}
                    >
                        Eng
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-4.5" aria-label="Социальные сети">
                <a
                    href="https://vk.com"
                    className="inline-flex h-7.5 items-center outline-none focus-visible:outline-none"
                >
                    <img src="/VK.svg" alt="VK" />
                </a>
                <a
                    href="https://web.telegram.org"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-link"
                    aria-label="Telegram"
                >
                    <img src="/Telegram.svg" alt="" aria-hidden />
                </a>
                <a
                    href="https://web.whatsapp.com"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-link"
                    aria-label="WhatsApp"
                >
                    <img src="/Whatsapp.svg" alt="" aria-hidden />
                </a>
            </div>
        </footer>
    )
}

export default Footer
