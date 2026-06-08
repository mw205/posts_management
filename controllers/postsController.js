const { get } = require("../routes/usersRouter");
const postsService = require("../services/postsService");
const APIError = require("../utils/APIError.js");

const getPosts = async (req, res) => {
  const posts = await postsService.readPosts();
  const postsWithFlag = posts.map((post) => {
    const postObj = post.toObject();
    return {
      ...postObj,
      isOwner: postObj.userId.toString() === req.user._id.toString(),
    };
  });
  return res
    .status(200)
    .json({ message: "Posts fetched successfully!!", data: postsWithFlag });
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  const post = await postsService.getPostById(postId);
  if (!post) {
    throw new APIError("Post not found", 404);
  }

  const postObj = post.toObject();
  const data = {
    ...postObj,
    isOwner: postObj.userId.toString() === req.user._id.toString(),
  };
  return res.status(200).json({ message: "Post fetched successfully!!", data });
};
const createPost = async (req, res) => {
  const postData = {
    ...req.body,
    userId: req.user._id,
  };
  const post = await postsService.createPost(postData);

  return res
    .status(201)
    .json({ message: "Post created successfully!!", data: post });
};
const updatePost = async (req, res) => {
  const post = await postsService.getPostById(req.params.id);
  if (!post) {
    throw new APIError("Post not found", 404);
  }

  if (post.userId.toString() !== req.user._id.toString()) {
    throw new APIError("You are not authorized to update this post", 401);
  }
  const updatedPost = await postsService.updatePost(req.params.id, req.body);

  return res
    .status(200)
    .json({ message: "Post updated successfully!!", data: updatedPost });
};
const deletePost = async (req, res) => {
  const post = await postsService.getPostById(req.params.id);
  if (!post) {
    throw new APIError("Post not found", 404);
  }

  if (post.userId.toString() !== req.user._id.toString()) {
    throw new APIError("You are not authorized to update this post", 401);
  }
  await postsService.deletePost(req.params.id);

  return res.status(200).json({ message: "Post deleted successfully!!" });
};
module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
