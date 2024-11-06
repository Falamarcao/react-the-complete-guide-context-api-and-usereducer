import { ReactNode, useReducer } from 'react';

import { DUMMY_PRODUCTS } from '../../data/dummy-products';

import { ShoppingCart } from '../../models/ShoppingCart';

import { CartContext } from './context';

type ACTIONTYPE =
  | { type: 'ADD_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_CART'; payload: { id: string; amount: number } };

const shoppingCartReducer = (state: ShoppingCart, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updatedItems = [...state.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload.id
        )!;
        updatedItems.push({
          id: action.payload.id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        // ...state,
        items: updatedItems,
      };
    }
    case 'UPDATE_CART': {
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    }
    default:
      throw new Error();
  }
};

interface CartContextProviderProps {
  children: ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [shoppingCart, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });

  const handleAddItemToCart = (id: string) => {
    shoppingCartDispatch({ type: 'ADD_ITEM', payload: { id } });
  };

  const handleUpdateCartItemQuantity = (id: string, amount: number) => {
    shoppingCartDispatch({
      type: 'UPDATE_CART',
      payload: { id, amount },
    });
  };

  const contextValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
