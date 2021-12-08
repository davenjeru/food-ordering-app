import CartContext, {CartState, ICartContext} from "./cart-context";
import {FC, useReducer} from "react";
import {ICartItem} from "../components/Cart/Cart";


const defaultCartState: CartState = {items: [], totalAmount: 0};

const cartReducer = (prevState: CartState, action: { type: string, data?: any }) => {
  if (action.type === 'ADD_ITEM') {
    const item: ICartItem = action.data;
    const updatedTotalAmount = prevState.totalAmount + item.price * item.amount

    const existingCartItemIndex = prevState.items.findIndex(value => value.id === item.id)
    const existingCartItem = prevState.items[existingCartItemIndex]
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount
      }

      updatedItems = [...prevState.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = prevState.items.concat(item)
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }


  if (action.type === 'REMOVE_ITEM') {
    const id: string = action.data
    const existingCartItemIndex = prevState.items.findIndex(value => value.id === id)
    const existingCartItem = prevState.items[existingCartItemIndex]
    const updatedTotalAmount = prevState.totalAmount - existingCartItem.price

    let updatedItems;

    if (existingCartItem.amount === 1) {

      updatedItems = prevState.items.filter(item => item.id !== id)
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      }
      updatedItems = [...prevState.items]

      updatedItems[existingCartItemIndex] = updatedItem

    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }

  }

  if (action.type === 'CLEAR') return defaultCartState
  return defaultCartState
}


const CartProvider: FC = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHandler = (item: ICartItem) => {
    dispatchCartAction({type: 'ADD_ITEM', data: item})
  }
  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({type: 'REMOVE_ITEM', data: id})
  };
  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'})
  };

  const cartContext: ICartContext = {
    items: cartState.items!,
    totalAmount: cartState.totalAmount!,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
