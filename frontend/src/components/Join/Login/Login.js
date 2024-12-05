import React, { useState } from "react";
import styles from "./login.module.scss";
import PasswordComponent from "../../FormComponents/PasswordComponent/PasswordComponent";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";
import {
  loginUser,
  selectToken,
  toastOptions,
} from "../../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Modal from "../../Modal/Modal";
import fetchApi from "../../../utils/fetch-utils";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [value, setValue] = useState({
    "login-email1": "",
    "login-password1": "",
    "forgot-password-email1": "",
  });
  const [showModal, setShowModal] = useState(false);
  const [joinErr, setJoinErr] = useState({
    "login-email1": false,
    "login-password1": false,
    "forgot-password-email1": false,
  });

  const userToken = useSelector(selectToken);
  if (userToken) return <Navigate to={location.state?.from || "/"} />;
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
      "forgot-password-email1": "",
    });
    return <Navigate to="/" />;
  };

  const onForgotPasswordBtnClick = async (e) => {
    e.preventDefault();
    let formData = {
      email: value["forgot-password-email1"].toLowerCase(),
      rootURL: window.location.origin,
    };

    try {
      const res = await fetchApi({
        urlExt: "user/forgot-password",
        method: "POST",
        formData,
      });
      if (!res.ok) toast.error(res.error, toastOptions);
      if (res.ok) toast.success(res.message, toastOptions);
      setValue((prev) => ({ ...prev, "forgot-password-email1": "" }));
      setShowModal(false);
    } catch (error) {
      toast.error("Something went wrong!.", toastOptions);
      console.log(error.message);
    }
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
          <button
            type="button"
            className={styles["forgot-password-cta"]}
            onClick={() => setShowModal(true)}
          >
            Forgot password
          </button>
          <button type="submit" className={styles["btn"]} disabled={validate()}>
            LOGIN
          </button>
        </form>
        <Modal
          title="Forgot Password"
          setOpenModal={setShowModal}
          openModal={showModal}
        >
          <InputComponent
            data={{
              id: "forgot-password-email1",
              type: "email",
              label: "Email",
            }}
            value={value}
            setValue={setValue}
            setJoinErr={setJoinErr}
          />
          <button
            className={styles["btn"]}
            onClick={onForgotPasswordBtnClick}
            disabled={value["forgot-password-email1"].trim() === ""}
          >
            Submit
          </button>
        </Modal>
      </div>
    </>
  );
}

export default Login;
