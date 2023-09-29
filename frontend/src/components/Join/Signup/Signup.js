import React, { useState } from "react";
import styles from "../Login/login.module.scss";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";
import PasswordComponent from "../../FormComponents/PasswordComponent/PasswordComponent";

function Signup() {
  const [joinErr, setJoinErr] = useState({
    "signup-password1": false,
    "signup-email1": false,
    "signup-name1": false,
  });
  const [value, setValue] = useState({
    "signup-password1": "",
    "signup-email1": "",
    "signup-name1": "",
  });
  const validate = () => {
    if (
      !value["signup-email1"] ||
      !value["signup-password1"] ||
      !value["signup-name1"]
    )
      return true;
    if (
      joinErr["signup-email1"] ||
      joinErr["signup-password1"] ||
      joinErr["signup-name1"]
    )
      return true;
    return false;
  };
  return (
    <div className={styles["form-container"]}>
      <form>
        <InputComponent
          data={{ id: "signup-name1", type: "text", label: "Name" }}
          value={value}
          setValue={setValue}
          setJoinErr={setJoinErr}
        />
        <InputComponent
          data={{ id: "signup-email1", type: "email", label: "Email" }}
          value={value}
          setValue={setValue}
          setJoinErr={setJoinErr}
        />
        <PasswordComponent
          id="signup-password1"
          value={value}
          setValue={setValue}
          setJoinErr={setJoinErr}
        />
        <button type="submit" className={styles["btn"]} disabled={validate()}>
          SIGNUP
        </button>
      </form>
    </div>
  );
}

export default Signup;
