const TemporaryUser = require("../models/temporaryUserModal");

const checkIfValidResendOTPReq = async (req, res, next) => {
  const { email } = req.cookies;
  try {
    const user = await TemporaryUser.findOne({ email });
    if (user.nextOtpAfter.getTime() > new Date().getTime())
      return res.status(400).json({
        message: "Please wait for cooldown before generating a new OTP.",
      });
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = checkIfValidResendOTPReq;
