import classes from "./Cart.module.css";
import React, {FC, Fragment, MouseEventHandler, useContext, useState} from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export interface ICartItem {
  id: string,
  name: string,
  amount: number,
  price: number
}

const Cart: FC<{ onHideCart: MouseEventHandler }> = props => {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

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

  const orderHandler = () => {
    setIsCheckingOut(true)
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  );

  const submitOrder = async (userData: {
    name: string,
    street: string,
    postalCode: string,
    city: string,
  }) => {
    setIsSubmitting(true)
    await fetch('https://react-http-76101-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  };

  let cartModalContent = (<Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{displayTotalAmount}</span>
    </div>

    {isCheckingOut && <Checkout onConfirm={submitOrder} onHideCart={props.onHideCart}/>}
    {!isCheckingOut && modalActions}
  </Fragment>);

  const isSubmittingModalContent = <p>Sending order data...</p>
  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully submitted the order</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
      </div>
    </Fragment>
  )
  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart
