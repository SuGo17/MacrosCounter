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
} = require("../controllers/userController");
const alreadyRegisteredCheck = require("../middleware/alreadyRegisteredCheck");
const temporaryUserSignUpCheck = require("../middleware/temporaryUserSignUpCheck");
const verifyOtpTemporaryUserCheck = require("../middleware/verifyOtpTemporaryUserCheck");
const verifyOtpValidCheck = require("../middleware/verifyOTPValidCheck");
const checkIfValidResendOTPReq = require("../middleware/checkIfValidResendOTPReq");

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
router.route("/token-refresh").post(tokenRefresh);
router.route("/logout").post(loggedInAuth, logout);
router.use(requireAuth);
router.route("/delete").delete(deleteUser);
router.route("/details").get(getDetails).patch(updateDetails);

module.exports = router;
