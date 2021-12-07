import React from "react";
import {ICartItem} from "../components/Cart/Cart";

export type CartState = {
  items: Array<ICartItem>
  totalAmount: number
}

export interface ICartContext extends CartState{
  addItem: (item: ICartItem) => void
  removeItem: (id: string) => void
}

const initialCartContext: ICartContext = {
  items: [],
  totalAmount: 0,
  addItem: (item) => {
  },
  removeItem: (id) => {
  }
}

const CartContext = React.createContext(initialCartContext)

export default CartContext;
