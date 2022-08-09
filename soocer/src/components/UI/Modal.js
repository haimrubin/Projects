import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHide}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalHel = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment >
      {ReactDOM.createPortal(<Backdrop onHide={props.onHide} />, portalHel)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalHel
      )}
    </Fragment>
  );
};

export default Modal;
