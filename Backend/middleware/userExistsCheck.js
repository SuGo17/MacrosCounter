const User = require("../models/userModel");

const userExistsCheck = async (req, res, next) => {
  let { email } = req.body;
  if (!email) email = req.cookies.email;
  if (!email)
    return res.status(401).json({
      message: "Invalid Request, Please provide a valid email address.",
    });
  try {
    const user = await User.findOne({ email });
    if (!user)
      throw new Error("User account doesn't exist, Please register first.");
    req.cookies.email = email;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = userExistsCheck;
