import React, { useState } from "react";
import InputComponent from "../../../FormComponents/InputComponent/InputComponent";
import styles from "../profileComponent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserDetails,
  updateUserDetails,
} from "../../../../reducers/userReducer";

function Edit({ setEdit }) {
  const dispatch = useDispatch();
  const [profileErr, setProfileErr] = useState(null);
  const userDetails = useSelector(selectUserDetails);
  const [value, setValue] = useState({
    "profile-name": userDetails?.name || "",
    "profile-email": userDetails?.email || "",
    "profile-age": userDetails?.age || "",
    "profile-weight": userDetails?.weight || "",
    "profile-height": userDetails?.height || "",
    "profile-calories": userDetails?.calories || "",
  });
  const validData = () => {
    if (profileErr)
      return (
        profileErr["profile-age"] ||
        profileErr["profile-weight"] ||
        profileErr["profile-height"] ||
        profileErr["profile-calories"]
      );
  };

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

  //prettier-ignore
  const inpProperty = [
    { type: "text", label: "NAME", id: "profile-name", disabled: true },
    { type: "text", label: "EMAIL", id: "profile-email", disabled: true },
    { type: "text", label: "AGE", id: "profile-age",valueType:"number" },
    { type: "text", label: "HEIGHT", id: "profile-height",valueType:"number" },
    { type: "text", label: "WEIGHT", id: "profile-weight",valueType:"number" },
    { type: "text", label: "CALORIES", id: "profile-calories",valueType:"number" },
  ];
  return (
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
  );
}

export default Edit;
