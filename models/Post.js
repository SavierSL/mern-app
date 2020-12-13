const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postDescription: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
  },
  dislikes: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = Post = mongoose.model("post", PostSchema);
