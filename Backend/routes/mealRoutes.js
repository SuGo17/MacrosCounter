const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const creatorAuth = require("../middleware/creatorAuth");
const validIDCheck = require("../middleware/validIDCheck");
const {
  getMeal,
  addMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealController");

const router = express.Router();

router.use(requireAuth)
router.route("/").post(addMeal);
router.route("/:date").get(getMeal);
router.route("/:id").patch(validIDCheck,creatorAuth,updateMeal).delete(validIDCheck,creatorAuth,deleteMeal);

module.exports = router;
