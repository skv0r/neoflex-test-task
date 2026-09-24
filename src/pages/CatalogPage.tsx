import Card from '../components/Card/Card'
import { headphones, wirelessHeadphones } from '../data/catalog'

const CatalogPage = () => {
    return (
        <>
            <section className="mb-7">
                <h2 className="mb-5 text-[17px] text-text-muted">Наушники</h2>
                <ul className="catalog-grid">
                    {headphones.map((item) => (
                        <li key={item.id}>
                            <Card item={item} />
                        </li>
                    ))}
                </ul>
            </section>
            <section className='mb-5'>
                <h2 className="mb-5 text-[17px] text-text-muted">Беспроводные наушники</h2>
                <ul className="catalog-grid">
                    {wirelessHeadphones.map((item) => (
                        <li key={item.id}>
                            <Card item={item} />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default CatalogPage
