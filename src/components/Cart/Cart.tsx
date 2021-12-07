import classes from "./Cart.module.css";
import React, {FC, MouseEventHandler, useContext} from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

export interface ICartItem {
  id: string,
  name: string,
  amount: number,
  price: number
}

const Cart: FC<{ onHideCart: MouseEventHandler }> = props => {
  const cartCtx = useContext(CartContext);
  const displayTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

  const hasItems = cartCtx.items.length > 0

  const cartItemAddHandler = (item: ICartItem) => {
    cartCtx.addItem({...item, amount: 1})
  };

  const cartItemRemoveHandler = (id: ICartItem["id"]) => {
    cartCtx.removeItem(id)

  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {
        cartCtx.items.map(cartItem => (
          <CartItem
            key={cartItem.id}
            onAdd={cartItemAddHandler.bind(null, cartItem)}
            onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
            {...cartItem}/>
        ))
      }
    </ul>
  )

  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{displayTotalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart
