const TemporaryUser = require("../models/temporaryUserModal");

const verifyOtpTemporaryUserCheck = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await TemporaryUser.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Invalid request, User not found" });
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = verifyOtpTemporaryUserCheck;
