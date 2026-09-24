import Card from '../components/Card/Card'
import { headphones, wirelessHeadphones } from '../data/catalog'

const CatalogPage = () => {
  return (
    <>
      <section className="mb-7">
        <h2 className="mb-5 text-[17px] text-text-muted">Наушники</h2>
        <ul className="m-0 flex list-none flex-wrap gap-7.5 p-0">
          {headphones.map((item) => (
            <li key={item.id} className="shrink-0">
              <Card item={item} />
            </li>
          ))}
        </ul>
      </section>
      <section className='mb-5'>
        <h2 className="mb-5 text-[17px] text-text-muted">Беспроводные наушники</h2>
        <ul className="m-0 flex list-none flex-wrap gap-7.5 p-0">
          {wirelessHeadphones.map((item) => (
            <li key={item.id} className="shrink-0">
              <Card item={item} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default CatalogPage
