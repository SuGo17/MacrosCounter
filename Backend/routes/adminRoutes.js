const router = require("express").Router()
const requireAuth = require("../middleware/requireAuth")
const adminAuth = require("../middleware/adminAuth")

const {changeRole,getAllUsers,searchUserByName} = require("../controllers/adminController")

router.use(requireAuth,adminAuth)
router.route("/change-role").post(changeRole)
router.route("/get-all-users").get(getAllUsers)
router.route("/search-users-by-name").get(searchUserByName)

module.exports = router