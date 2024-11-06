import { createContext } from 'react';
import { ShoppingCart } from '../models/ShoppingCart';

interface CartContextType extends ShoppingCart {
  addItemToCart: (id: string) => void;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);
