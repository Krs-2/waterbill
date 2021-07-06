import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation, useParams } from "react-router-dom";
import Notification from "../notification/Notification";

const modalRoot = document.getElementById("modal-root");
let element = document.createElement("div");

export default function Modal_(props) {
  let history = useHistory();
  useEffect(() => {
    console.log("-------->  componentDidMount");
    modalRoot.appendChild(element);
    return () => {
      console.log("-------->  ComponentWillUnmount");
      modalRoot.removeChild(element);
    };
  }, []);
  const closeEvent = (event) => {
    //setIsLoginModalOpen(!isLoginModalOpen);
    history.goBack();
  };
  return createPortal(
    <div className="modal__root" id={props.children && props.children.name} onClick={closeEvent}>
      <div
        className="modal__root__container"
        onClick={(event) => {
          return event.stopPropagation();
        }}
      >
        <div className="form__row__item">
          <h3>{"Modal Title"}</h3>
          <CloseSharpIcon
            className="modal-close"
            id={props.children && props.children.name}
            fontSize="default"
            onClick={closeEvent}
          />
        </div>
        <div className="form__row__item">{props.children}</div>
        <div className="form__row__item">
          <Notification />
        </div>
      </div>
    </div>,
    element
  );
}
