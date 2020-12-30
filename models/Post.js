const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
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
  comments: [
    //make sure to be the same in the routes
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
module.exports = Post = mongoose.model("post", PostSchema);
