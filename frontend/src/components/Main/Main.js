import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./Main.module.scss";

function Main() {
  return (
    <main className={styles.main}>
      <NavBar />
    </main>
  );
}

export default Main;
