import classes from "./Modal.module.css";
import React, {FC, Fragment, MouseEventHandler} from 'react'
import {createPortal} from "react-dom";

const Backdrop: FC<{onClose: MouseEventHandler}> = props => (
  <div className={classes.backdrop} onClick={props.onClose}/>
)

const ModalOverlay: FC = props => (
  <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
)

const overlayPortal = document.getElementById('overlay-root')

const Modal: FC<{onClose: MouseEventHandler}> = (props) => {
  return <Fragment>
    {createPortal(<Backdrop onClose={props.onClose}/>, overlayPortal!)}
    {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayPortal!)}
  </Fragment>
}

export default Modal
