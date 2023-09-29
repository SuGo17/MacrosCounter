import React, { useState } from "react";
import styles from "./login.module.scss";
import PasswordComponent from "../../FormComponents/PasswordComponent/PasswordComponent";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";

function Login() {
  const [value, setValue] = useState({
    "login-email1": "",
    "login-password1": "",
  });
  const [joinErr, setJoinErr] = useState({
    "login-email1": false,
    "login-password1": false,
  });

  const validate = () => {
    if (!value["login-email1"] || !value["login-password1"]) return true;
    if (joinErr["login-email1"] || joinErr["login-password1"]) return true;
    return false;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = {
      email: value["login-email1"],
      password: value["login-password1"],
    };
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      };
      const data = await fetch(
        "https://macros-counter-sugo17.onrender.com/api/user/login",
        options
      );
      const response = await data.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles["form-container"]}>
      <form onSubmit={submitHandler}>
        <InputComponent
          data={{ id: "login-email1", type: "email", label: "Email" }}
          value={value}
          setValue={setValue}
          setJoinErr={setJoinErr}
        />
        <PasswordComponent
          id="login-password1"
          value={value}
          setValue={setValue}
          setJoinErr={setJoinErr}
        />
        <button type="submit" className={styles["btn"]} disabled={validate()}>
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
