const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: Array,
  },
});

userSchema.statics.signup = async function (email, password, name) {
  if (!email || !name || !password)
    throw new Error("All fields must be filled.");

  if (!validator.isEmail(email)) throw new Error("Email is not valid");

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, name });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw new Error("All fields must be filled.");

  if (!validator.isEmail(email)) throw new Error("Email is not valid");

  const user = await this.findOne({ email });

  if (!user) throw Error("User account does not exists.");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incorrect Password");

  return user;
};

module.exports = mongoose.model("User", userSchema);
