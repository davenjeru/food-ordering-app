import React, {FC, useContext} from "react";
import {Meal} from "../AvailableMeals";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem: FC<Meal> = props => {
  const displayPrice = `$${props.price.toFixed(2)}`

  const cartCtx = useContext(CartContext)

  const addToCartHandler = (amount: number) => {
    const {id, name, price} = props
    cartCtx.addItem({id, name, amount, price})
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{displayPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem
