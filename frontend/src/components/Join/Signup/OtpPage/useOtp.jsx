import { useEffect, useRef, useState } from "react";

export function useOtp(length) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const otpInputRefs = useRef([]);

  useEffect(() => {
    if (otpInputRefs.current[0]) otpInputRefs.current[0].focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < otp.length - 1 && otpInputRefs.current[index + 1])
      otpInputRefs.current[index + 1].focus();
  };
  const handleClick = (index) => {
    otpInputRefs.current[index].setSelectionRange(1, 1);
  };
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      otpInputRefs.current[index - 1]
    ) {
      otpInputRefs.current[index - 1].focus();
    }
  };
  return {
    otp,
    setOtp,
    otpInputRefs,
    handleChange,
    handleClick,
    handleKeyDown,
  };
}
