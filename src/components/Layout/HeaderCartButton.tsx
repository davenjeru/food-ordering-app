import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import React, {FC, MouseEventHandler, useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton: FC<{ onClick: MouseEventHandler }> = props => {
  const [buttonHighlighted, setButtonHighlighted] = useState(false)

  const cartCtx = useContext(CartContext)
  const {items} = cartCtx
  const numberOfCartItems = items.reduce((acc, item) => acc + item.amount, 0)

  useEffect(() => {
    if (items.length === 0) return
    setButtonHighlighted(true)
    const timer = setTimeout(setButtonHighlighted, 300, false)

    return () => clearTimeout(timer)
  }, [items])


  const btnClasses = `${classes.button} ${buttonHighlighted && classes.bump}`
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}> <CartIcon/> </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
