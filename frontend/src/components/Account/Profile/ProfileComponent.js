import React, { useState } from "react";
import styles from "./profileComponent.module.scss";
import { selectUserDetails } from "../../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";

function ProfileComponent() {
  const [edit, setEdit] = useState(false);
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    "profile-age": userDetails.age || "",
    "profile-weight": userDetails.weight || "",
    "profile-height": userDetails.height || "",
    "profile-calories": userDetails.calories || "",
  });
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
      )}
      {!edit && (
        <div className={styles["edit"]}>{/* <InputComponent /> */}</div>
      )}
    </>
  );
}

export default ProfileComponent;
