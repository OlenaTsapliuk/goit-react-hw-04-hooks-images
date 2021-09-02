import { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    imageName: "",
  };

  handleChange = (e) => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.imageName.trim() === "") {
      toast.info("Enter image name");
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: "" });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.label}>Search</span>
          </button>

          <input
            className={s.input}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imageName}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default Searchbar;
