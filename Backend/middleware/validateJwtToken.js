const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const validateJwtToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Invalid Request" });
  try {
    const { email } = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ email });
    if (!user) res.status(403).json({ message: "Invalid Request" });
    req.cookies.email = email;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = validateJwtToken;
