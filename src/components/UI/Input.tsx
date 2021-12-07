import React, {forwardRef, ForwardRefRenderFunction, InputHTMLAttributes} from "react";
import classes from "./Input.module.css";

const Input: ForwardRefRenderFunction<HTMLInputElement, { input: InputHTMLAttributes<HTMLInputElement>, label: string }> = (props, forwardedRef) => (
  <div className={classes.input}>
    <label htmlFor={props.input.id}>{props.label}</label>
    <input ref={forwardedRef} {...props.input}/>
  </div>
)

export default forwardRef(Input)
