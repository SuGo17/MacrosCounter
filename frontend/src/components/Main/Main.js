import React from "react";
import styles from "./Main.module.scss";
import RoutesComponent from "../RoutesComponent/RoutesComponent";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { userActions } from "../../reducers/userReducer";

function Main() {
  const dispatch = useDispatch();
  const userToken = Cookies.get("userToken");
  dispatch(userActions.updateToken(userToken));
  return (
    <main className={styles.main}>
      <RoutesComponent />
    </main>
  );
}

export default Main;
