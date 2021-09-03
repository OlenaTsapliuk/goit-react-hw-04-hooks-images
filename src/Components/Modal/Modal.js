import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#rootModal");

export default function Modal({onClose, children}) {
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleBackdrop);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleBackdrop);
    };
    
  })
 

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };
  const handleBackdrop = (e) => {
    if (e.currentTarget === e.target) {
     onClose();
    }
  };
  
    return createPortal(
      <div className={s.overlay} onClick={handleBackdrop}>
        <div className={s.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//     window.addEventListener("click", this.handleBackdrop);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//     window.removeEventListener("click", this.handleBackdrop);
//   }

//   handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//     }
//   };
//   handleBackdrop = (e) => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };
//   render() {
//     return createPortal(
//       <div className={s.overlay} onClick={this.handleBackdrop}>
//         <div className={s.modal}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };
