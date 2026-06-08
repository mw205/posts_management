const Post = require("../models/postModel.js");
const readPosts = async () => {
  const posts = Post.find();
  return posts;
};
const getPostById = async (id) => {
  const post = await Post.findById(id);
  return post;
};
const createPost = async (post) => {
  const newPost = await Post.create(post);
  return newPost;
};
const updatePost = async (id, post) => {
  const updatedPost = await Post.findOneAndUpdate({ _id: id }, post, {
    new: true,
  });
  return updatedPost;
};
const deletePost = async (id) => {
  const deletedPost = await Post.findOneAndDelete({ _id: id });
  return deletedPost;
};
module.exports = {
  readPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
