import React, { useState } from "react";
import styles from "./login.module.scss";
import PasswordComponent from "../../FormComponents/PasswordComponent/PasswordComponent";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";
import { loginUser, selectToken } from "../../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    "login-email1": "",
    "login-password1": "",
  });
  const [joinErr, setJoinErr] = useState({
    "login-email1": false,
    "login-password1": false,
  });

  const userToken = useSelector(selectToken);
  if (userToken) return <Navigate to="/" />;

  const validate = () => {
    if (!value["login-email1"] || !value["login-password1"]) return true;
    if (joinErr["login-email1"] || joinErr["login-password1"]) return true;
    return false;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = {
      email: value["login-email1"].toLowerCase(),
      password: value["login-password1"],
    };
    dispatch(loginUser(formData));
    setValue({
      "login-email1": "",
      "login-password1": "",
    });
  };

  return (
    <>
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
    </>
  );
}

export default Login;
