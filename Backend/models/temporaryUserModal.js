const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const temporaryUserSchema = new Schema({
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
  otp: {
    type: String,
    required: true,
  },
  otpExpires: {
    type: Date,
    required: true,
  },
  nextOtpAfter: {
    type: Date,
    required: true,
  },
});

temporaryUserSchema.statics.temporarySignup = async function (
  email,
  password,
  name,
  otp
) {
  if (!email || !name || !password)
    throw new Error("All fields must be filled.");

  if (!validator.isEmail(email)) throw new Error("Email is not valid");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const temporaryUser = await this.create({
    email,
    password: hash,
    name,
    otp,
    otpExpires: Date.now() + 5 * 60 * 1000,
    nextOtpAfter: Date.now() + 30 * 1000,
  });

  return temporaryUser;
};

module.exports = mongoose.model("TemporaryUser", temporaryUserSchema);
