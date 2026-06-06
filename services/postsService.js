// const path = require("path");

// const fs = require("fs").promises;
// const postsFileName = path.join(__dirname, "../posts.json");
// const readPosts = async () => {
//   const postsData = await fs.readFile(postsFileName, "utf-8");
//   return JSON.parse(postsData);
// };

// const writePosts = async (posts) => {
//   await fs.writeFile(postsFileName, JSON.stringify(posts));
// };
// const getPostById = async (id) => {
//   const posts = await readPosts();
//   const post = posts.find((post) => post.id === +id);
//   return post;
// };
// const createPost = async (post) => {
//   const posts = await readPosts();
//   let newPost = { id: posts.length + 1, ...post };
//   posts.push(newPost);

//   await writePosts(posts);
//   return newPost;
// };

// const updatePost = async (id, post) => {
//   const posts = await readPosts();
//   const postIndex = posts.findIndex((post) => post.id === +id);
//   if (postIndex === -1) {
//     return null;
//   }
//   posts[postIndex] = { ...posts[postIndex], ...post };
//   await writePosts(posts);
//   return posts[postIndex];
// };
// const deletePost = async (id) => {
//   const posts = await readPosts();
//   const postIndex = posts.findIndex((post) => post.id === +id);
//   if (postIndex === -1) {
//     return null;
//   }
//   posts.splice(postIndex, 1);
//   return true;
// };

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
