import { useRef } from 'react';

import CartModal, { ModalRef } from './CartModal.js';
import { ShoppingCart } from '../models/ShoppingCart.js';

interface HeaderProps {
  cart: ShoppingCart;
  onUpdateCartItemQuantity: (productId: string, amount: number) => void;
}

export default function Header({
  cart,
  onUpdateCartItemQuantity,
}: HeaderProps) {
  const modal = useRef<ModalRef>(null);

  const cartQuantity = cart.items.length;

  function handleOpenCartClick() {
    modal?.current?.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        cartItems={cart.items}
        onUpdateCartItemQuantity={onUpdateCartItemQuantity}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
