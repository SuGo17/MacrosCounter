import React, { useState } from "react";
import styles from "./profileComponent.module.scss";
import {
  selectLoading,
  selectUserDetails,
  updateUserDetails,
} from "../../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";
import Loader from "../../Loader/Loader";

function ProfileComponent() {
  const [edit, setEdit] = useState(false);
  const userDetails = useSelector(selectUserDetails);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  // console.log(userDetails);
  const [value, setValue] = useState({
    "profile-name": userDetails?.name || "",
    "profile-email": userDetails?.email || "",
    "profile-age": userDetails?.age || "",
    "profile-weight": userDetails?.weight || "",
    "profile-height": userDetails?.height || "",
    "profile-calories": userDetails?.calories || "",
  });
  // console.log(value);
  const [profileErr, setProfileErr] = useState(null);
  const inpProperty = [
    { type: "text", label: "NAME", id: "profile-name", disabled: true },
    { type: "text", label: "EMAIL", id: "profile-email", disabled: true },
    { type: "text", label: "AGE", id: "profile-age" },
    { type: "text", label: "HEIGHT", id: "profile-height" },
    { type: "text", label: "WEIGHT", id: "profile-weight" },
    { type: "text", label: "CALORIES", id: "profile-calories" },
  ];

  const submitHandler = (e) => {
    const formData = {
      age: value["profile-age"],
      weight: value["profile-weight"],
      height: value["profile-height"],
      calories: value["profile-calories"],
    };
    e.preventDefault();
    try {
      dispatch(updateUserDetails(formData));
    } catch (error) {
      console.log(error.message);
    }
  };

  const validData = () => {
    if (profileErr)
      return (
        profileErr["profile-age"] ||
        profileErr["profile-weight"] ||
        profileErr["profile-height"] ||
        profileErr["profile-calories"]
      );
  };

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
      {edit && (
        <div className={styles["edit"]}>
          <div className={styles["heading-container"]}>
            <h2>PROFILE</h2>
          </div>
          <form onSubmit={submitHandler}>
            {inpProperty.map((ele, ind) => {
              return (
                <InputComponent
                  key={ind}
                  data={ele}
                  value={value}
                  setValue={setValue}
                  setJoinErr={setProfileErr}
                />
              );
            })}
            <div className={styles["btn-container"]}>
              <button
                onClick={() => setEdit(false)}
                type="button"
                className={styles["btn-ghost"]}
              >
                CANCEL
              </button>
              <button
                type="submit"
                className={styles["btn"]}
                disabled={validData()}
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
}

export default ProfileComponent;
