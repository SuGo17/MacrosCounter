const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const loggedInAuth = require("../middleware/loggedInAuth");

const {
  login,
  tokenRefresh,
  logout,
  deleteUser,
  getDetails,
  updateDetails,
  generateOTP,
  verifyOTPandSignUp,
  resendOTP,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const alreadyRegisteredCheck = require("../middleware/alreadyRegisteredCheck");
const temporaryUserSignUpCheck = require("../middleware/temporaryUserSignUpCheck");
const verifyOtpTemporaryUserCheck = require("../middleware/verifyOtpTemporaryUserCheck");
const verifyOtpValidCheck = require("../middleware/verifyOTPValidCheck");
const checkIfValidResendOTPReq = require("../middleware/checkIfValidResendOTPReq");
const userExistsCheck = require("../middleware/userExistsCheck");
const validateJwtToken = require("../middleware/validateJwtToken");

const router = express.Router();

router.route("/login").post(login);
router
  .route("/signup")
  .post(alreadyRegisteredCheck, temporaryUserSignUpCheck, generateOTP);
router
  .route("/signup-otp-resend")
  .post(
    alreadyRegisteredCheck,
    verifyOtpTemporaryUserCheck,
    checkIfValidResendOTPReq,
    resendOTP
  );
router
  .route("/verify-signup-otp")
  .post(
    alreadyRegisteredCheck,
    verifyOtpTemporaryUserCheck,
    verifyOtpValidCheck,
    verifyOTPandSignUp
  );
router.route("/forgot-password").post(userExistsCheck, forgotPassword);
router.route("/reset-password").post(validateJwtToken, resetPassword);
router.route("/token-refresh").post(tokenRefresh);
router.route("/logout").post(loggedInAuth, logout);
router.use(requireAuth);
router.route("/delete").delete(deleteUser);
router.route("/details").get(getDetails).patch(updateDetails);

module.exports = router;
