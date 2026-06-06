const { Router } = require("express");

const router = Router();
const userController = require("../controllers/userController.js");
const validate = require("../middlewares/validate.js");
const createUserSchema = require("../validations/users/createUserSchema");
const updateUserSchema = require("../validations/users/updateUserSchema");

router.post("/", validate(createUserSchema), userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
