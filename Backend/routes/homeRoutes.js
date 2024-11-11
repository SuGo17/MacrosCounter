const router = require("express").Router();

router.route("/").get((_, res) => {
  res.status(200).json({ message: "success" });
});

module.exports = router;
