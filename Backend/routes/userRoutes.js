const express = require("express");
const {
  login,
  signup,
  deleteUser,
  getDetails,
  updateDetails,
  addDetails,
} = require("../controllers/userController");
const router = express.Router();
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/:id").delete(deleteUser);
router
  .route("/details/:id")
  .get(getDetails)
  .post(addDetails)
  .patch(updateDetails);

module.exports = router;
