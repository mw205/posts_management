const userService = require("../services/usersService.js");
const APIError = require("../utils/APIError.js");
const emailService = require("../services/emailService.js");
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

const signUp = async (req, res) => {
  // check for email if it already exists
  const emailExists = await userService.getUserByEmail(req.body.email);
  if (emailExists) {
    throw new APIError("Email already exists", 400);
  }
  const newUser = await userService.signUp(req.body);
  const token = await userService.generateToken(newUser);
  const newUserObj = newUser.toObject();
  delete newUserObj.password;
  await emailService.sendEmail(
    "welcome",
    { name: newUser.name },
    newUser.email,
    "Welcome to our platform",
  );
  res.status(201).json({
    message: "user created successfully",
    data: { ...newUserObj, accessToken: token },
  });
};

const signIn = async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email, true);
  if (user) {
    const isPasswordCorrect = await userService.comparePasswords(
      req.body.password,
      user.password,
    );
    if (isPasswordCorrect) {
      const token = await userService.generateToken(user);
      const userObj = user.toObject();
      delete userObj.password;
      return res.json({
        message: "user signd in successfully",
        data: { ...userObj, accessToken: token },
      });
    }
  }
  throw new APIError("Invalid email or password", 401);
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
  signUp,
  updateUser,
  deleteUser,
  signIn,
};
