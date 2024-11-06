import { createContext } from 'react';
import { ShoppingCart } from '../../models/ShoppingCart.ts';

interface CartContextType extends ShoppingCart {
  addItemToCart: (id: string) => void;
  updateCartItemQuantity: (productId: string, amount: number) => void;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);
