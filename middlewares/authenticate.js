const jwt = require("jsonwebtoken");
const util = require("util");
const APIError = require("../utils/APIError.js");
const userService = require("../services/usersService.js");
require("dotenv").config();
const verifyToken = util.promisify(jwt.verify);

const authenticate = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw APIError("You are not logged in", 401);
  }

  const decoded = await verifyToken(token, process.env.JWT_SECRET);
  const currentUser = await userService.getUserById(decoded.id);
  if (!currentUser) {
    throw new APIError("User not found", 404);
  }
  req.user = currentUser;

  next();
};

module.exports = authenticate;
