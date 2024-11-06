import { DUMMY_PRODUCTS } from '../data/dummy-products.ts';
import Product from './Product.js';

interface ShopProps {
  onAddItemToCart: (id: string) => void;
}

export default function Shop({ onAddItemToCart }: ShopProps) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
