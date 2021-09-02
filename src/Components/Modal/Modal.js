import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#rootModal");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("click", this.handleBackdrop);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("click", this.handleBackdrop);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  handleBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdrop}>
        <div className={s.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
