import Header from './components/Header';
import Product from './components/Product';
import Shop from './components/Shop';

import { DUMMY_PRODUCTS } from './data/dummy-products';

import CartContextProvider from './store/ShoppingCart/CartContextProvider-useReducer';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
