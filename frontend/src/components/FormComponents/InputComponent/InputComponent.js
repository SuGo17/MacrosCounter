import React, { useEffect, useState } from "react";
import styles from "./inputComponent.module.scss";

function InputComponent({ data, value, setValue, setJoinErr }) {
  const { type, label, id } = data;
  const [inpValue, setInpValue] = useState("");
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

  return (
    <div className={styles["input-container"]}>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        value={value[id]}
        className={styles[`${type}-input`]}
        id={id}
        onChange={(e) => setInpValue(e.target.value)}
        onBlur={validate}
      />
      {err && <p className={styles["error"]}>* {`${err}`}</p>}
      {}
    </div>
  );
}

export default InputComponent;
