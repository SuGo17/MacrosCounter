import React from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../reducers/userReducer";
import styles from "../profileComponent.module.scss";

function Display({ setEdit }) {
  const userDetails = useSelector(selectUserDetails);

  const calcBMR = ({ height, weight, age }) => {
    return Math.round(88.362 + 13.397 * weight + 4.799 * height - 5.677 * age);
  };

  const data = [
    { label: "Name", value: userDetails.name.toUpperCase() },
    { label: "Email", value: userDetails.email },
    { label: "Age", value: userDetails.age, unit: "Years" },
    { label: "Height", value: userDetails.height, unit: "Cm" },
    { label: "Weight", value: userDetails.weight, unit: "Kg" },
    { label: "Calories", value: userDetails.calories, unit: "kcal" },
    { label: "BMR", value: calcBMR(userDetails), unit: "kcal" },
    { label: "Role", value: userDetails.role },
  ];
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
        {data.map((ele, index) => {
          if (ele.label === "Role" && ele.value !== "ADMIN") return "";
          return (
            <div className={styles["row"]} key={index}>
              <p>{ele.label}: </p>
              <p>
                {ele.value} {ele.unit}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Display;
