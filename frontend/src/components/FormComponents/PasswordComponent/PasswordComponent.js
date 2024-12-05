import React, { useEffect, useRef, useState } from "react";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import styles from "../InputComponent/inputComponent.module.scss";

function PasswordComponent({
  id,
  value,
  setValue,
  isError = false,
  setJoinErr,
  label = "Password",
  errorMessage = `Password field should not be empty.`,
}) {
  const [showPass, setShowPass] = useState(false);
  const [passValue, setPassValue] = useState("");
  const [err, setErr] = useState(null);
  const passRef = useRef();

  const validate = () => {
    !passValue || isError ? setErr(errorMessage) : setErr(null);
  };

  useEffect(() => {
    setValue((prev) => {
      let a = { ...prev };
      a[`${id}`] = passValue;
      return a;
    });
  }, [passValue, id, setValue]);

  useEffect(() => {
    setJoinErr((prev) => {
      let a = { ...prev };
      a[`${id}`] = err ? true : false;
      return a;
    });
  }, [err, id, setJoinErr]);

  const defStyle = {
    height: "2rem",
    width: "2rem",
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    right: "0",
    transform: "translateY(-50%)",
  };
  const handleInputChange = (e) => {
    setPassValue(e.target.value);
    setErr(null);
  };
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={id}>{label}:</label>
      <div className={styles["pass-container"]}>
        <input
          type="password"
          className={styles["input-element"]}
          ref={passRef}
          value={value[id]}
          id={id}
          onChange={handleInputChange}
          onBlur={validate}
        />
        <IconContext.Provider
          value={{
            style: showPass ? { ...defStyle, color: "#df2e38" } : defStyle,
          }}
        >
          {showPass && (
            <IoEyeSharp
              onClick={() => {
                setShowPass((prev) => !prev);
                passRef.current.type = "password";
              }}
            />
          )}
          {!showPass && (
            <IoEyeOffSharp
              onClick={() => {
                setShowPass((prev) => !prev);
                passRef.current.type = "text";
              }}
            />
          )}
        </IconContext.Provider>
      </div>
      {err && <p className={styles["error"]}>* {`${err}`}</p>}
    </div>
  );
}

export default PasswordComponent;
