const router = require("express").Router()
const requireAuth = require("../middleware/requireAuth")
const adminAuth = require("../middleware/adminAuth")

const {changeRole,getAllUsers} = require("../controllers/adminController")

router.use(requireAuth,adminAuth)
router.route("/change-role").post(changeRole)
router.route("/get-all-users").get(getAllUsers)

module.exports = router