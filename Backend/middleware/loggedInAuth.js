const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const loggedInAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(401).json({ error: "User is not logged In." });
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id });
    user
      ? (req.user = user)
      : res.status(401).json({ message: "User Doesnot exist." });
    user.refreshToken
      ? next()
      : res.status(401).json({ error: "User is not logged In." });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = loggedInAuth;
