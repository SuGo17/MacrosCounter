import React from "react";
import styles from "./Main.module.scss";
import Router from "../Router/Router";

function Main() {
  return (
    <main className={styles.main}>
      <Router />
    </main>
  );
}

export default Main;
