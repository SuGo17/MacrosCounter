import React from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../reducers/userReducer";
import styles from "../profileComponent.module.scss";

function Display({ setEdit }) {
  const userDetails = useSelector(selectUserDetails);
  return (
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
          <p>{userDetails.name.toUpperCase()}</p>
        </div>
        <div className={styles["row"]}>
          <p>Email: </p>
          <p>{userDetails.email}</p>
        </div>
        <div className={styles["row"]}>
          <p>Age: </p>
          <p>{userDetails.age || ""} Years</p>
        </div>
        <div className={styles["row"]}>
          <p>Height: </p>
          <p>{userDetails.height || ""} cm</p>
        </div>
        <div className={styles["row"]}>
          <p>Weight: </p>
          <p>{userDetails.weight || ""} Kg</p>
        </div>
        <div className={styles["row"]}>
          <p>Calories: </p>
          <p>{userDetails.calories || ""} kcal</p>
        </div>
        {userDetails.role === "ADMIN" && (
          <div className={styles["row"]}>
            <p>Role: </p>
            <p>{userDetails.role || ""}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Display;
