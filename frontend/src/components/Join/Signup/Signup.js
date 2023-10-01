import React, { useEffect, useState } from "react";
import styles from "../Login/login.module.scss";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";
import PasswordComponent from "../../FormComponents/PasswordComponent/PasswordComponent";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, signupUser } from "../../../reducers/userReducer";
import { Navigate } from "react-router-dom";

function Signup() {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(user);
  }, [user]);
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
  const userToken = useSelector(selectToken);
  if (userToken) return <Navigate to="/" />;
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

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("hi");
    let formData = {
      email: value["signup-email1"].toLowerCase(),
      password: value["signup-password1"],
      name: value["signup-name1"],
    };
    dispatch(signupUser(formData));
    setValue({
      "signup-email1": "",
      "signup-password1": "",
      "signup-name1": "",
    });
  };
  return (
    <div className={styles["form-container"]}>
      <form onSubmit={submitHandler}>
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
