import { useState } from "react";
import { Link } from "react-router-dom";

    

const Footer = () => {

    const [isRus, setIsRus] = useState(true)

    return (
        <footer className="container-app flex justify-between p-7.25 bg-surface rounded-t-card text-text-button">
            <Link to="/" className="font-bold text-text-logo text-[25px] leading-[30px]">QPICK</Link>
            <nav className="flex flex-col gap-2.5">
                <Link to="/favourite" className="h-5.25">Избранное</Link>
                <Link to="/cart" className="h-5.25">Корзина</Link>
                <Link to="/contact" className="h-5.25">Контакты</Link>
            </nav>
            <div>
                <Link to="/rules" className="h-5.25">Условия сервиса</Link>
                <div className="flex items-center gap-4.25">
                    <img src="/RU.svg" alt="language"  className="size-5"/>
                    <button onClick={() => setIsRus(!isRus)} className={` ${isRus ? `text-text-secondary`: `text-text-button`} `}>Рус</button>
                    <button onClick={() => setIsRus(!isRus)} className={` ${isRus ? `text-text-button`: `text-text-secondary`} `}>Eng</button>
                </div>
            </div>
            <div className="flex gap-4.5">
                <a href="https://vk.com" className="inline-flex h-7.5 items-center">
                    <img src="/VK.svg" alt="VK" />
                </a>
                <a href="https://web.telegram.org">
                    <img src="/Telegram.svg" alt="Telegram" />
                </a>
                <a href="https://web.whatsapp.com">
                    <img src="/Whatsapp.svg" alt="Whatsapp" />
                </a>
            </div>
        </footer>
    )
}

export default Footer;