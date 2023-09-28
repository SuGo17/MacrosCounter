import React, { useRef, useState } from "react";
import styles from "./login.module.scss";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { IconContext } from "react-icons";

function Login() {
  const [showPass, setShowPass] = useState(false);
  const defStyle = {
    height: "2rem",
    width: "2rem",
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    right: "0",
  };
  const passRef = useRef();
  return (
    <div className={styles["form-container"]}>
      <form>
        <div className={styles["input-container"]}>
          <label htmlFor="email">Email:</label>
          <input type="email" className={styles["email-input"]} id="email" />
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="password">Password:</label>
          <div className="pass-container">
            <input
              type="password"
              className={styles["input-element"]}
              ref={passRef}
              id="password"
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
        </div>
        <button type="submit" className={styles["btn"]}>
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
