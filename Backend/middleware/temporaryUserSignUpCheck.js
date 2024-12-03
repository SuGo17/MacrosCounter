const TemporaryUser = require("../models/temporaryUserModal");

const temporaryUserSignUpCheck = async (req, res, next) => {
  const { email } = req.body;
  try {
    await TemporaryUser.findOneAndDelete({ email });
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = temporaryUserSignUpCheck;
