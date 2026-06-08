const mongoose = require("mongoose");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const signToken = util.promisify(jwt.sign);
require("dotenv").config();
const readUsers = async () => {
  const users = await User.find();
  return users;
};
const signUp = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const mappedUser = {
    ...user,
    dateOfBirth: new Date(user.dateOfBirth),
    password: hashedPassword,
  };
  const newUser = await User.create(mappedUser);
  return newUser;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};
const getUserByEmail = async (email, includePassword = false) => {
  const query = User.findOne({ email: email });
  if (includePassword) {
    query.select("+password");
  }
  return await query;
};
const updateUser = async (id, user) => {
  const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
    new: true,
  });
  return updatedUser;
};
const deleteUser = async (id) => {
  const deletedUser = await User.findOneAndDelete({ _id: id });
  return deleteUser;
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = async (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };
  return await signToken(payload, secretKey, options);
};
module.exports = {
  signUp,
  readUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  comparePasswords,
  generateToken,
};
