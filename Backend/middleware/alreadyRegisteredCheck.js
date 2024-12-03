const User = require("../models/userModel");

const alreadyRegisteredCheck = async (req, res, next) => {
  let { email } = req.body;
  if (!email) email = req.cookies.email;
  try {
    const user = await User.findOne({ email });
    if (user) throw new Error("User already registered.");
    req.cookies.email = email;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = alreadyRegisteredCheck;
