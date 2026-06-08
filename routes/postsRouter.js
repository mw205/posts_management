const { Router } = require("express");

const router = Router();
const postsController = require("../controllers/postsController.js");
const validate = require("../middlewares/validate.js");
const createPostSchema = require("../validations/posts/createPostSchema.js");
const updatePostSchema = require("../validations/posts/updatePostSchema.js");
const { authenticate } = require("../middlewares");

router.use(authenticate);
router.get("/", postsController.getPosts);
router.get("/:id", postsController.getPostById);
router.post("/", validate(createPostSchema), postsController.createPost);
router.patch("/:id", validate(updatePostSchema), postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
