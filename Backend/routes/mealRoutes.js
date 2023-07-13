const express = require("express");
const {
  getMeal,
  addMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealController");
const router = express.Router();

router.route("/:id/:date").get(getMeal);
router.route("/:id").patch(updateMeal).delete(deleteMeal);
router.route("/").post(addMeal);

module.exports = router;
