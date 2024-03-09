import React from "react";
import styles from "./checkboxComponent.module.scss";

function CheckboxComponent({ data, value, handleChange }) {
  return (
    <div className={styles["checkbox-container"]}>
      <label htmlFor={data.id}>{data.label}</label>
      <input
        type="checkbox"
        id={data.id}
        checked={data.checked}
        disabled={data.disabled}
        onChange={handleChange}
      />
    </div>
  );
}

export default CheckboxComponent;
