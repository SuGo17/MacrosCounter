import React, { useEffect, useState } from "react";
import styles from "./inputComponent.module.scss";

function InputComponent({ data, value, setValue, setJoinErr = () => {} }) {
  const { type, label, id, disabled } = data;
  const [inpValue, setInpValue] = useState(value[id]);
  const [err, setErr] = useState(null);

  const validate = () => {
    if (type === "email" && inpValue) {
      const regexRef = new RegExp(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      );
      inpValue && !regexRef.test(inpValue)
        ? setErr(" Please enter a valid email.")
        : setErr(null);
      return;
    }
    !inpValue ? setErr(`${label} field should not be empty.`) : setErr(null);
  };

  useEffect(() => {
    setValue((prev) => {
      let a = { ...prev };
      a[`${id}`] = inpValue;
      return a;
    });
  }, [inpValue, id, setValue]);

  useEffect(() => {
    setJoinErr((prev) => {
      let a = { ...prev };
      a[`${id}`] = err ? true : false;
      return a;
    });
  }, [err, id, setJoinErr]);

  const handleInputChange = (e) => {
    setInpValue(e.target.value);
    setErr(null);
  };
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        value={value[id]}
        className={styles[`${type}-input`]}
        id={id}
        onChange={handleInputChange}
        onBlur={validate}
        disabled={disabled}
      />
      {err && <p className={styles["error"]}>* {`${err}`}</p>}
    </div>
  );
}

export default InputComponent;
