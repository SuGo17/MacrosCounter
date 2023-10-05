import React from "react";
import styles from "./loader.module.scss";
import { TailSpin } from "react-loader-spinner";

function Loader() {
  return (
    <div className={styles.loader}>
      <TailSpin
        height="80"
        width="80"
        color="#df2e38"
        ariaLabel="tailspin-loading"
        visible={true}
      />
    </div>
  );
}

export default Loader;
