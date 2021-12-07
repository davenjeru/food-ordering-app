import classes from './CartItem.module.css';
import {FC, MouseEventHandler} from "react";
import {ICartItem} from "./Cart";

const CartItem: FC<ICartItem & {onAdd: Function, onRemove: Function}> = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove as MouseEventHandler}>−</button>
        <button onClick={props.onAdd as MouseEventHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
