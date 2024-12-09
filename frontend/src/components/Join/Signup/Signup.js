import React, { useState } from "react";
import styles from "../Login/login.module.scss";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";
import PasswordComponent from "../../FormComponents/PasswordComponent/PasswordComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  signupUser,
  toastOptions,
} from "../../../reducers/userReducer";
import { Navigate } from "react-router-dom";
import OtpPage from "./OtpPage/OtpPage";
import fetchApi from "../../../utils/fetch-utils";
import { toast } from "react-toastify";
import { useOtp } from "./OtpPage/useOtp";
import Loader from "../../Loader/Loader";

function Signup() {
  const dispatch = useDispatch();
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    handleChange: handleOtpChange,
    handleClick: handleOtpClick,
    handleKeyDown: handleOtpKeyDown,
    otp,
    otpInputRefs,
    setOtp,
  } = useOtp(6);
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
    const otpValue = otp.join("");
    if (otp.length < 6) return;
    let formData = {
      email: value["signup-email1"].toLowerCase(),
      otp: otpValue,
    };
    dispatch(signupUser(formData));
  };

  const handleSendOtp = async () => {
    let formData = {
      email: value["signup-email1"].toLowerCase(),
      password: value["signup-password1"],
      name: value["signup-name1"],
    };
    setLoading(true);
    try {
      const sendOtpRes = await fetchApi({
        urlExt: "user/signup",
        method: "POST",
        formData,
      });
      if (!sendOtpRes.ok) throw new Error(sendOtpRes.error);
      setShowOTPComponent(true);
      toast.success("Otp sent to requested email!", toastOptions);
    } catch (error) {
      toast.error("Something went wrong!.", toastOptions);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
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
        <OtpPage
          openModal={showOTPComponent}
          setOpenModal={setShowOTPComponent}
          submitHandler={submitHandler}
          handleChange={handleOtpChange}
          handleClick={handleOtpClick}
          handleKeyDown={handleOtpKeyDown}
          otp={otp}
          otpInputRefs={otpInputRefs}
          setOtp={setOtp}
        />
        <button
          type="button"
          className={styles["btn"]}
          disabled={validate()}
          onClick={handleSendOtp}
        >
          SIGNUP
        </button>
      </form>
      {loading && <Loader />}
    </div>
  );
}

export default Signup;
