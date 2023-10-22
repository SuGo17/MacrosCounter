const UserRoles = require("../models/userRoleModel");
const Users = require("../models/userModel");
const mongoose = require("mongoose");

const changeRole = async (req, res) => {
  const { usersArr } = req.body;
  let result;
  try {
    result = await Promise.all(
      usersArr.map(async (ele) => {
        let msg;
        const { id, admin } = ele;
        let user;
        if (!id || !mongoose.Types.ObjectId.isValid(id))
          msg = "Please provide a valid user ID.";
        else {
          try {
            user = await UserRoles.findOne({ user_id: id }).populate("user_id");
            if (!user) msg = "User does not exist.";
            else {
              if (admin === true) {
                await UserRoles.findOneAndUpdate(
                  { user_id: user.user_id },
                  { role: "ADMIN" }
                );
                msg = "Admin access added to the user.";
              } else {
                await UserRoles.findOneAndUpdate(
                  { user_id: user.user_id },
                  { role: "USER" }
                );
                msg = "Admin access removed from the user.";
              }
            }
          } catch (error) {
            msg = error.message;
          }
        }
        return { _id: user.user_id._id, name: user.user_id._id, message: msg };
      })
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.status(200).json(result);
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserRoles.find({ role: "USER" })
      .populate("user_id", "-password -refreshToken -__v")
      .exec();
    const admins = await UserRoles.find({ role: "ADMIN" })
      .populate("user_id", "-password -refreshToken -__v")
      .exec();
    res.json({ users, admins });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const searchUserByName = async (req, res) => {
  const { searchTerm } = req.query;
  const decodedSearchTerm = decodeURIComponent(searchTerm);
  const searchRegex = new RegExp(decodedSearchTerm, "i");

  try {
    const allUsers = await Users.find({ name: searchRegex }, { password: 0 });
    res.json({ allUsers });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { changeRole, getAllUsers, searchUserByName };
