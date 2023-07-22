const express = require("express");
const requireAuth = require("../middleware/requireAuth")
const adminAuth = require("../middleware/adminAuth")

const {
  getMacros,
  addMacros,
  updateMacros,
  deleteMacros,
} = require("../controllers/macrosController");

const router = express.Router();

router.use(requireAuth)
router.route("/:id").get(getMacros)
router.use(adminAuth)
router.route("/:id").patch(updateMacros).delete(deleteMacros);
router.route("/").post(addMacros);

module.exports = router;
