import classes from './Header.module.css'
import mealsImage from '../../assest/meals.png'
import React, {FC, Fragment, MouseEventHandler} from "react";
import HeaderCartButton from "./HeaderCartButton";

const Header: FC<{ onDisplayCart: MouseEventHandler }> = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onDisplayCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!"/>
      </div>
    </Fragment>
  )
}

export default Header
