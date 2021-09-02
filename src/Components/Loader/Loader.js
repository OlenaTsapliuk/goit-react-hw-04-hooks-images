import Loader from "react-loader-spinner";
import { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./Loader.module.css";
export default class Spinner extends Component {
  //other logic
  render() {
    return (
      <div className={s.spinner}>
        <Loader type="Circles" color="#59067a" height={100} width={100} />
      </div>
    );
  }
}
