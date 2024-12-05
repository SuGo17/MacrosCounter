import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./index.module.scss";
import PasswordComponent from "../FormComponents/PasswordComponent/PasswordComponent";
import { jwtDecode } from "jwt-decode";
import fetchApi from "../../utils/fetch-utils";
import { toast } from "react-toastify";
import { toastOptions } from "../../reducers/userReducer";
function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [value, setValue] = useState({
    "reset-password1": "",
    "reset-password2": "",
  });
  const [joinErr, setJoinErr] = useState({
    "reset-password1": false,
    "reset-password2": false,
  });
  const [passwordErrorMessage, setPasswordErrorMessage] = useState();

  useEffect(() => {
    if (
      value["reset-password1"] !== value["reset-password2"] &&
      value["reset-password2"] !== ""
    )
      setPasswordErrorMessage(
        "Confirm Password and New Password should be the same!"
      );
    else setPasswordErrorMessage(null);
  }, [value]);

  const validate = () => {
    return (
      value["reset-password1"].trim() === "" ||
      value["reset-password2"].trim() === "" ||
      joinErr["reset-password1"] ||
      joinErr["reset-password2"] ||
      value["reset-password1"] !== value["reset-password2"]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) return;
    const formData = {
      password: value["reset-password1"],
    };

    try {
      const res = await fetchApi({
        urlExt: "user/reset-password",
        method: "POST",
        formData,
        token,
      });
      if (!res.ok) toast.error(res.error, toastOptions);
      if (res.ok) toast.success(res.message, toastOptions);
      window.location.replace("/join/login");
    } catch (error) {
      toast.error("Something went wrong!.", toastOptions);
      console.log(error.message);
    }
  };

  if (!token)
    return (
      <div className={styles["container"]}>
        <h3 style={{ fontSize: "3rem" }}>Invalid request</h3>
      </div>
    );
  return (
    <div className={styles["container"]}>
      <form onSubmit={handleSubmit}>
        <h3 className={styles["title"]}>Reset Password</h3>
        <PasswordComponent
          label="Enter New Password"
          id="reset-password1"
          value={value}
          setValue={setValue}
          setJoinErr={setJoinErr}
        />
        <PasswordComponent
          label="Confirm New Password"
          id="reset-password2"
          isError={joinErr["reset-password2"]}
          errorMessage={passwordErrorMessage}
          value={value}
          setValue={setValue}
          setJoinErr={setJoinErr}
        />
        {passwordErrorMessage && (
          <p className={styles["error"]}>* {passwordErrorMessage}</p>
        )}
        <button type="submit" className={styles["btn"]} disabled={validate()}>
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
