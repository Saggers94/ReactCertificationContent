import React, { Component } from "react";
import Classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxilliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      // This children checking for the updating is important as
      // the spinner is children of the modal file and also the order
      // summary. so whenever we change children it is important
      // to change the trigger in the modal to see the effect of
      // the spinner
      nextProps.children !== this.props.children
    );
  }

  componentDidUpdate() {
    console.log("[Modal] ComponentDidUpdate");
  }

  render() {
    console.log(this.props.show);
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={Classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
