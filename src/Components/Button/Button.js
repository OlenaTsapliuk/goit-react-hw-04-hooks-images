import PropTypes from "prop-types";
import s from "./Button.module.css";
function Button({ buttonClick }) {
  return (
    <div className={s.wrapper}>
      <button type="button" onClick={buttonClick} className={s.button}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  buttonClick: PropTypes.func.isRequired,
};
export default Button;
