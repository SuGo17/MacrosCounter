const TemporaryUser = require("../models/temporaryUserModal");
const User = require("../models/userModel");
const UserDetails = require("../models/userDetailsModel");
const jwt = require("jsonwebtoken");
const UserRoles = require("../models/userRoleModel");
const { GenerateEmail } = require("../utils/generateEmail");
const validator = require("validator");

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
    date.setDate(date.getDate() + 1);
    let refreshTokenArr = user.refreshToken.filter((ele) => {
      const eleDate = new Date(ele.expiry);
      return eleDate.getTime() > date.getTime();
    });
    refreshTokenArr = [
      ...refreshTokenArr,
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
    res.status(200).json({ email, token, refreshToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const generateOTPfunction = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const generateOTP = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res.status(400).json({ error: "All fields are required" });

  if (!validator.isEmail(email))
    return res.status(400).json({ error: "Email is not valid" });
  try {
    const otp = generateOTPfunction();
    const htmlTemplate = `
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h2 style="text-align: center; color: #df2e38;">Your OTP Code</h2>
                <p style="text-align: center; font-size: 18px; color: #333333;">We received a request to send you a One-Time Password (OTP). Use the following OTP to verify your identity:</p>
                <h3 style="text-align: center; font-size: 36px; color: #df2e38; margin: 20px 0;">${otp}</h3>
                <p style="text-align: center; font-size: 16px; color: #333333;">This OTP is valid for 5 minutes. If you didn't request this, please ignore this email.</p>
                <div style="text-align: center; margin-top: 30px;">
                    <p style="font-size: 14px; color: #888888;">If you have any questions, feel free to contact us.</p>
                </div>
            </div>
        </body>
        </html>
    `;
    res.cookie("email", email);
    GenerateEmail({
      email: email,
      otp,
      subject: "Verify your account",
      html: htmlTemplate,
      callback: async (err, _) => {
        try {
          if (err) throw new Error(err);
          await TemporaryUser.temporarySignup(email, password, name, otp);
          return res.json({ message: "Success" });
        } catch (error) {
          return res.status(400).json({ message: err });
        }
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyOTPandSignUp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.cookies.email;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const temporaryUser = await TemporaryUser.findOne({ email });
    const user = await User.signup(
      temporaryUser.email,
      temporaryUser.password,
      temporaryUser.name
    );
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
    await TemporaryUser.findOneAndDelete({ email });
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  const date = new Date();
  date.setDate(date.getDate() + 1);
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
    let refreshTokenArr = user.refreshToken.filter((ele) => {
      const eleDate = new Date(ele.expiry);
      return eleDate.getTime() > date.getTime();
    });
    refreshTokenArr = refreshTokenArr.map((ele) => ele.refreshToken);
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
      {
        refreshToken: user.refreshToken.filter(
          (ele) => ele.refreshToken !== refreshToken
        ),
      }
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
  generateOTP,
  verifyOTPandSignUp,
};
