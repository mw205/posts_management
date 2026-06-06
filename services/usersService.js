const { write } = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

const fs = require("fs").promises;
const usersFileName = path.join(__dirname, "../users.json");

const readUsers = async () => {
  const usersData = await fs.readFile(usersFileName, "utf-8");
  return JSON.parse(usersData);
};

const writeUsers = async (users) => {
  await fs.writeFile(usersFileName, JSON.stringify(users));
};

const createUser = async (user) => {
  const users = await readUsers();
  const newUser = {
    id: users.length + 1,
    ...user,
  };
  users.push(newUser);
  await writeUsers(users);
  return newUser;
};
const getUserById = async (id) => {
  const users = await readUsers();
  const user = users.find((user) => user.id === +id);
  return user;
};
const updateUser = async (id, user) => {
  const users = await readUsers();

  const userIndex = users.findIndex((user) => user.id === +id);
  if (userIndex === -1) {
    return null;
  }
  users[userIndex] = { ...users[userIndex], ...user };
  await writeUsers(users);
  return users[userIndex];
};

const deleteUser = async (id) => {
  const users = await readUsers();
  const userIndex = users.findIndex((user) => user.id === +id);
  if (userIndex === -1) {
    return null;
  }
  users.filter((user) => user.id !== +id);
  await writeUsers(users);
  return true;
};

module.exports = {
  createUser,
  readUsers,
  getUserById,
  updateUser,
  deleteUser,
  readUsers,
};
