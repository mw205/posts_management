
const userService = require("../services/usersService.js");
const APIError = require("../utils/APIError.js");

const getUsers = async (req, res) => {
  const users = await userService.readUsers();
  return res
    .status(200)
    .json({ message: "Users fetched successfully!!", data: users });
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);
  if (!user) {
    throw new APIError("User not found", 404);
  }
  return res
    .status(200)
    .json({ message: "User fetched successfully!!", data: user });
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);

  res.status(201).json({ message: "user created successfully", data: newUser });
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  const user = await userService.updateUser(id, req.body);
  if (!user) {
    throw new APIError("User not found", 404);
  }
  return res
    .status(200)
    .json({ message: "User updated successfully!!", data: user });
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const deleteUser = await userService.deleteUser(id);
  if (!deleteUser) {
    throw new APIError("user not found", 404);
  }
  res.json({ message: "user deleted successfully" });
};
module.exports = {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
