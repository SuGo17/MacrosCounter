const User = require("../models/userModel");

const alreadyRegisteredCheck = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) throw new Error("User already registered.");
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = alreadyRegisteredCheck;
