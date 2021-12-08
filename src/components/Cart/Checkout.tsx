import classes from './Checkout.module.css'
import {FC, FormEvent, MouseEventHandler, useRef, useState} from "react";

const isEmpty = (v: string): boolean => v.trim() === ''
const isFiveChars = (v: string): boolean => v.trim().length === 5


interface FormValidityState {
  name: boolean,
  street: boolean,
  postalCode: boolean,
  city: boolean,
}


const Checkout: FC<{ onHideCart: MouseEventHandler, onConfirm: Function }> = (props) => {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const streetInputRef = useRef<HTMLInputElement>(null)
  const postalCodeInputRef = useRef<HTMLInputElement>(null)
  const cityInputRef = useRef<HTMLInputElement>(null)

  const [formInputsValidity, setFormInputsValidity] = useState<FormValidityState>({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  })

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    const enteredName = nameInputRef.current!.value
    const enteredStreet = streetInputRef.current!.value
    const enteredPostalCode = postalCodeInputRef.current!.value
    const enteredCity = cityInputRef.current!.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid

    if (!formIsValid) {

      return
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    })
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>

      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}/>
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>

      <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
        <label htmlFor="postal-code">Postal Code</label>
        <input type="text" id="postal-code" ref={postalCodeInputRef}/>
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}
      </div>

      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}/>
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.onHideCart}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
