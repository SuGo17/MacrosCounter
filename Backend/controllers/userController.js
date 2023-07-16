const login = (req, res) => {
  res.json({ msg: "Hello this is Login route" });
};

const signup = (req, res) => {
  res.json({ msg: "Hello this is Sign Up route" });
};

const deleteUser = (req, res) => {
  res.json({ msg: "Hello this is Sign Up route" });
};

const getDetails = (req, res) => {
  res.json({ msg: "Hello this is get user details route" });
};

const updateDetails = (req, res) => {
  res.json({ msg: "Hello this is user update details route" });
};

const addDetails = (req, res) => {
  res.json({ msg: "Hello this is user add details route" });
};

module.exports = {
  login,
  signup,
  deleteUser,
  getDetails,
  updateDetails,
  addDetails,
};
