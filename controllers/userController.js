const userService = require("../services/usersService.js");

const getUsers = async (req, res) => {
  const users = await userService.readUsers();
  return res
    .status(200)
    .json({ message: "Users fetched successfully!!", data: users });
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);
  if (user) {
    return res
      .status(200)
      .json({ message: "User fetched successfully!!", data: user });
  }
  return res.status(404).json({ message: "User not found" });
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);

  res.status(201).json({ message: "user created successfully", data: newUser });
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  const user = await userService.updateUser(id, req.body);
  if (user) {
    return res
      .status(200)
      .json({ message: "User updated successfully!!", data: user });
  }
  return res.status(404).json({ message: "User not found" });
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const deletedUser = await userService.deleteUser(id);
  if (deletedUser) {
    return res
      .status(200)
      .json({ message: "User deleted successfully!!", data: deletedUser });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};
module.exports = {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
