const { Router } = require("express");

const router = Router();
const postsController = require("../controllers/postsController.js");

router.get("/", postsController.getPosts);
router.get("/:id", postsController.getPostById);
router.post("/", postsController.createPost);
router.patch("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
