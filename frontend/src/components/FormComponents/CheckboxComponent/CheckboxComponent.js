import React from "react";
import styles from "./checkboxComponent.module.scss";

function CheckboxComponent({ data, value, handleChange }) {
  return (
    <div className={styles["checkbox-container"]}>
      <label htmlFor={data.id}>{data.label}</label>
      <input
        type="checkbox"
        name="admin"
        id={data.id}
        checked={value[data.id] === "ADMIN"}
        disabled={data.disabled}
        onChange={handleChange}
      />
    </div>
  );
}

export default CheckboxComponent;
