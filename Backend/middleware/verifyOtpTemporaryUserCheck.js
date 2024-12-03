const TemporaryUser = require("../models/temporaryUserModal");

const verifyOtpTemporaryUserCheck = async (req, res, next) => {
  const { email } = req.cookies;
  const { otp } = req.body;
  try {
    const user = await TemporaryUser.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Invalid request, User not found" });
    if (user.otpExpires.getTime() < new Date().getTime())
      return res
        .status(401)
        .json({ message: "Otp Expired, Please generate a new one" });
    if (+user.otp !== +otp)
      return res
        .status(401)
        .json({ message: "Invalid OTP, Please try again." });

    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = verifyOtpTemporaryUserCheck;
