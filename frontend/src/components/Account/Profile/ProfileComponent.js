import React, { useState } from "react";
import styles from "./profileComponent.module.scss";

function ProfileComponent() {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {!edit && (
        <div className={styles.display}>
          <div className={styles["heading-container"]}>
            <h2>PROFILE</h2>
            <button
              className={`${styles.btn} ${styles["edit-btn"]}`}
              onClick={() => {
                setEdit(true);
              }}
            >
              EDIT
            </button>
          </div>
          <div className={styles["content"]}>
            <div className={styles["row"]}>
              <p>Name: </p>
              <p>SURYAKOTIKIRAN M S</p>
            </div>
            <div className={styles["row"]}>
              <p>Email: </p>
              <p>kotisurya6@gmail.com</p>
            </div>
            <div className={styles["row"]}>
              <p>Age: </p>
              <p>23</p>
            </div>
            <div className={styles["row"]}>
              <p>Height: </p>
              <p>6' 0''</p>
            </div>
            <div className={styles["row"]}>
              <p>Weight: </p>
              <p>96 Kg</p>
            </div>
            <div className={styles["row"]}>
              <p>Calories: </p>
              <p>1600 kcal</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileComponent;
