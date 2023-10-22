const User = require("../models/userModel");
const UserDetails = require("../models/userDetailsModel");
const jwt = require("jsonwebtoken");
const UserRoles = require("../models/userRoleModel");

const createToken = (_id) => {
  let token = jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: "15m" });
  let refreshToken = jwt.sign({ _id }, process.env.REFRESHTOKEN_SECRET);
  return { token, refreshToken };
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const { token, refreshToken } = createToken(user._id);
    date = new Date();
    let refreshTokenArr = [
      ...user.refreshToken,
      {
        refreshToken,
        expiry: new Date(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
        ),
      },
    ];
    refreshTokenArr = refreshTokenArr.filter((ele) => {
      const eleDate = new Date(ele.expiry);
      return eleDate.getTime() > date.getTime();
    });
    await User.findOneAndUpdate(
      { _id: user._id },
      { refreshToken: refreshTokenArr }
    );
    res.status(200).json({ email, token, refreshToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.signup(email, password, name);
    const { token, refreshToken } = createToken(user._id);
    res.cookie("token", token);
    res.cookie("refreshToken", refreshToken);
    await UserDetails.create({ user_id: user._id });
    await UserRoles.create({ user_id: user._id });
    let refreshTokenArr = [
      ...user.refreshToken,
      {
        refreshToken,
        expiry: new Date(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
        ),
      },
    ];
    await User.findOneAndUpdate(
      { _id: user._id },
      { refreshToken: refreshTokenArr }
    );
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const tokenRefresh = async (req, res) => {
  const { refreshToken } = req.body;
  date = new Date();
  try {
    const { _id } = jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET);
    const user = await User.findOne({ _id });
    const refreshTokenArr = user.refreshToken.map((ele) => {
      if (ele.expiry.getTime() > date.getTime()) return ele.refreshToken;
    });
    if (!refreshTokenArr.includes(refreshToken))
      return res
        .status(401)
        .json({ error: "Invalid Request! User not logged in." });
    res.status(200).json({
      token: jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: "15m" }),
    });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findOne({ _id: req.user._id });
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { refreshToken: user.refreshToken.filter((ele) => ele !== refreshToken) }
    );
    res.status(200).json({ message: "Logout Succesful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    await UserDetails.findOneAndDelete({ user_id: user._id });
    await UserRoles.findOneAndDelete({ user_id: user._id });
    res
      .status(200)
      .json({ message: "Your account has been successfully deleted", user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const getDetails = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select(
      "email name -_id"
    );
    const userData = await UserDetails.findOne({
      user_id: req.user._id,
    }).select("-_id -__v -user_id");
    const role = await UserRoles.findOne({ user_id: req.user._id });
    res.status(200).json({
      userDetails: { ...user["_doc"], ...userData["_doc"], role: role.role },
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const updateDetails = async (req, res) => {
  const { height, weight, age, calories } = req.body;
  if (!height || !weight || !age || !calories)
    res.status(401).json({ error: "All fields must be filled." });
  if (isNaN(height) || isNaN(weight) || isNaN(age) || isNaN(calories))
    res.status(401).json({ error: "All values must be in number format." });
  const data = { user_id: req.user._id, height, weight, age, calories };
  try {
    const userData = await UserDetails.findOneAndUpdate(
      { user_id: data.user_id },
      data
    ).select("_id");
    res.status(200).json({ _id: userData._id, ...data });
  } catch (err) {
    res.status(401).json({ error: err.mesage });
  }
};

module.exports = {
  login,
  signup,
  tokenRefresh,
  logout,
  deleteUser,
  getDetails,
  updateDetails,
};
