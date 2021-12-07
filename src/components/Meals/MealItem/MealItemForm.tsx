import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import {FC, FormEvent, useRef, useState} from "react";

const MealItemForm: FC<{onAddToCart: (amount: number) => void}> = (props) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const [amountIsValid, setAmountIsValid] = useState(true)

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    const {value} = amountRef.current!
    const enteredAmount = +value
    if (value.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false)
      return
    }

    props.onAddToCart(enteredAmount)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        input={{
          id: 'amount__' + Math.random(),
          type: 'number',
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1
        }}
        label='Amount'/>
      <button>+Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
}

export default MealItemForm
