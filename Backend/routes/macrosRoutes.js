const express = require("express");

const {
  getMacros,
  addMacros,
  updateMacros,
  deleteMacros,
} = require("../controllers/macrosController");

const router = express.Router();
router.route("/:id").get(getMacros).patch(updateMacros).delete(deleteMacros);
router.route("/").post(addMacros);

module.exports = router;
