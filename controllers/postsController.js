const { get } = require("../routes/usersRouter");
const postsService = require("../services/postsService");

const getPosts = async (req, res) => {
  const posts = await postsService.readPosts();
  return res
    .status(200)
    .json({ message: "Posts fetched successfully!!", data: posts });
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  const post = await postsService.getPostById(postId);
  if (post) {
    return res
      .status(200)
      .json({ message: "Post fetched successfully!!", data: post });
  }
  return res.status(404).json({ message: "Post not found" });
};
const createPost = async (req, res) => {
  const post = await postsService.createPost(req.body);
  return res
    .status(201)
    .json({ message: "Post created successfully!!", data: post });
};
const updatePost = async (req, res) => {
  const post = await postsService.updatePost(req.params.id, req.body);
  if (post) {
    return res
      .status(200)
      .json({ message: "Post updated successfully!!", data: post });
  }
  return res.status(404).json({ message: "Post not found" });
};
const deletePost = async (req, res) => {
  const deletedPost = await postsService.deletePost(req.params.id);
  if (deletedPost) {
    return res.status(200).json({ message: "Post deleted successfully!!" });
  }
  return res.status(404).json({ message: "Post not found" });
};
module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
