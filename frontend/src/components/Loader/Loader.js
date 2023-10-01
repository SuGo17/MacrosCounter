import React from "react";
import styles from "./loader.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
