const { Router } = require("express");

const router = Router();
const userController = require("../controllers/userController.js");
const validate = require("../middlewares/validate.js");
const {
  updateUserSchema,
  signUpSchema,
  signInSchema,
} = require("../validations/users/index.js");
const { restrictTo, authenticate } = require("../middlewares/index.js");

router.post("/signup", validate(signUpSchema), userController.signUp);
router.post("/signin", validate(signInSchema), userController.signIn);
router.get("/", authenticate, restrictTo("admin"), userController.getUsers);
router.get("/:id", authenticate, userController.getUserById);
router.patch("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
