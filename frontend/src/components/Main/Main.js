import React from "react";
import styles from "./Main.module.scss";
import RoutesComponent from "../RoutesComponent/RoutesComponent";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { userActions } from "../../reducers/userReducer";
import InitLoad from "../../utils/Components/InitLoad";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Main() {
  const dispatch = useDispatch();
  let userToken = Cookies.get("userToken");
  userToken && dispatch(userActions.updateToken(userToken));

  return (
    <main className={styles.main}>
      <InitLoad>
        <RoutesComponent />
        <ToastContainer />
      </InitLoad>
    </main>
  );
}

export default Main;
