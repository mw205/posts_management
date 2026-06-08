const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
