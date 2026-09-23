import type { Product } from '../../data/catalog'

type CardProps = {
  item: Product
}

const Card = ({ item }: CardProps) => {
  return (
    <article className="flex h-101.75 w-[350px] shrink-0 flex-col justify-between rounded-card bg-surface px-5 pb-[26.5px] pt-3.75 text-[17px] shadow-card">
      <img
        src={item.image}
        alt={item.title}
        className="mx-auto h-59.25 w-55 object-contain"
      />
      <div className="flex flex-col justify-between  min-h-18.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug text-text-primary">{item.title}</h3>
          <div className="flex shrink-0 flex-col items-end leading-tight">
            <span className="font-semibold text-text-secondary">
              {item.price.toLocaleString('ru-RU')} ₽
            </span>
            {item.oldPrice != null && (
              <span className="text-sm text-text-secondary/60 line-through">
                {item.oldPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/star.png" alt="" className="size-4" aria-hidden />
            <span className="text-text-muted">{item.rating}</span>
          </div>
          <button type="button" className="font-semibold text-text-button">
            Купить
          </button>
        </div>
      </div>
    </article>
  )
}

export default Card
