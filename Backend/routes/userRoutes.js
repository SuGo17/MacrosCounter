const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const loggedInAuth = require("../middleware/loggedInAuth");

const {
  login,
  signup,
  tokenRefresh,
  logout,
  deleteUser,
  getDetails,
  updateDetails,
} = require("../controllers/userController");

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/token-refresh").post(tokenRefresh);
router.route("/logout").post(loggedInAuth, logout);
router.use(requireAuth);
router.route("/delete").delete(deleteUser);
router.route("/details").get(getDetails).patch(updateDetails);

module.exports = router;
