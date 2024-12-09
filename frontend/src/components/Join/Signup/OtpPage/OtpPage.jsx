import React from "react";
import Modal from "../../../Modal/Modal";
import styles from "./otpInput.module.scss";

function OtpPage({
  setOpenModal,
  otpInputRefs,
  openModal,
  otp,
  handleChange,
  handleClick,
  handleKeyDown,
  submitHandler,
  handleOtpResend,
}) {
  return (
    <Modal
      title="Verify OTP"
      setOpenModal={setOpenModal}
      openModal={openModal}
      classes={styles["otpModal"]}
    >
      <p>Please enter the 6-digit OTP sent to your registered email.</p>
      <div className={styles["otpContainer"]}>
        {otp?.map((value, index) => {
          return (
            <input
              type="text"
              className={styles["otpInput"]}
              key={index}
              value={value}
              ref={(ele) => (otpInputRefs.current[index] = ele)}
              onChange={(e) => handleChange(e, index)}
              onClick={() => {
                handleClick(index);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          );
        })}
      </div>
      <p>
        Click here to{" "}
        <button
          className={styles["btn-ghost"]}
          onClick={handleOtpResend}
          type="button"
        >
          Resend OTP
        </button>
      </p>
      <button
        className={styles["btn"]}
        type="submit"
        disabled={otp.join("").length < 6}
        onClick={submitHandler}
      >
        Verify
      </button>
    </Modal>
  );
}

export default OtpPage;
