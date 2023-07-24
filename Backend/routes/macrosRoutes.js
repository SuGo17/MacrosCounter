const express = require("express");
const requireAuth = require("../middleware/requireAuth")
const adminAuth = require("../middleware/adminAuth")
const validIDCheck = require("../middleware/validIDCheck");

const {
  getMacros,
  getAllMacros,
  addMacros,
  updateMacros,
  deleteMacros,
  getMacrosByName,
} = require("../controllers/macrosController");

const router = express.Router();

router.use(requireAuth)
router.route("/all").get(getAllMacros)
router.route("/search-by-name").get(getMacrosByName)
router.route("/:id").get(validIDCheck,getMacros)
router.use(adminAuth)
router.route("/:id").patch(validIDCheck,updateMacros).delete(validIDCheck,deleteMacros);
router.route("/").post(addMacros);

module.exports = router;
