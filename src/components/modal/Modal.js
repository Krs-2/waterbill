import React, { Component } from "react";
import { createPortal } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation, useParams } from "react-router-dom";
import "./style.scss";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  constructor(props) {
    super(props);
    this.element = document.createElement("div");
    this.state = {};
  }

  componentDidMount() {
    console.log("componentDidMount");
    modalRoot.appendChild(this.element);
  }
  componentWillUnmount() {
    console.log("ComponentWillUnmount");
    modalRoot.removeChild(this.element);
  }
  render() {
    return createPortal(
      <div className="modal__root" onClick={this.props.closeEvent}>
        <div
          className="root__container"
          onClick={(event) => {
            return event.stopPropagation();
          }}
        >
          <div>
            <h3>{"Modal Title"}</h3>
            <CloseSharpIcon className="modal-close" fontSize="default" onClick={this.props.closeEvent} />
          </div>
          {this.props.children}
          <div className="align-text-left sm-v-margin-top">
            <span>{this.props.successMsg || "Success Msg"}</span>
          </div>
          <div className="align-text-left sm-v-margin-top">
            <span>{this.props.errorMsg || "Error Msg"} </span>
          </div>
        </div>
      </div>,
      this.element
    );
  }
}

export default Modal;
