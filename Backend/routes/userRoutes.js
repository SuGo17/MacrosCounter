const express = require("express");
const requireAuth = require("../middleware/requireAuth")

const {
  login,
  signup,
  deleteUser,
  getDetails,
  updateDetails,
} = require("../controllers/userController");

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.use(requireAuth)
router.route("/delete").delete(deleteUser);
router
  .route("/details")
  .get(getDetails)
  .patch(updateDetails);

module.exports = router;
