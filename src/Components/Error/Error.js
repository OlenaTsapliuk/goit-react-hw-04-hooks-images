import PropTypes from "prop-types";
import errorImage from "../../images/oops.jpg";
import s from "./Error.module.css";

function Error({ textError }) {
  return (
    <div role="alert" className={s.wrapper}>
      <img src={errorImage} className={s.img} width="550" alt="no_res" />
      <p text={textError} className={s.textContent}>
        {textError}
      </p>
    </div>
  );
}

Error.propTypes = {
  textError: PropTypes.string.isRequired,
};

export default Error;
