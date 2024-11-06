import { createContext } from 'react';
import { ShoppingCart } from '../models/ShoppingCart';

export const CartContext = createContext<ShoppingCart>({
  items: [],
});
