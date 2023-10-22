const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const loggedInAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "User is not logged In." });
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id });
    if (!user) return res.status(401).json({ error: "User Does not exist." });
    req.user = user;
    if (!user.refreshToken)
      return res.status(401).json({ error: "User is not logged In." });
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = loggedInAuth;
