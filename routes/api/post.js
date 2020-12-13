const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const User = require("../../models/User");

//@route     POST api/post
//@desc      POST a post
//@access    Public
router.post(
  "/",
  [
    auth,
    [check("postDescription", "Post content is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const post = {
        user: req.user.id,
        ...req.body,
      };
      const newPost = new Post(post);
      newPost.save();
      res.send(newPost);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  }
);

//@route     DELETE api/post
//@desc      DELETE a post
//@access    Public
router.delete("/:post_id", auth, async (req, res) => {
  try {
    await Post.findOneAndDelete({
      _id: req.params.post_id,
    });

    res.send("Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//@route     DELETE api/post
//@desc      DELETE a post
//@access    Public
router.put("/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.post_id });
    const user = await User.findOne({ _id: req.user.id });
    const isLiked = await post.likes.filter((like) => {
      const likeID = like._id.toString();
      const userID = user._id.toString();

      return likeID === userID;
    });

    if (isLiked.length === 0) {
      post.likes.push(user);
      post.save();
      return res.send(post);
    }
    post.likes = post.likes.filter((like) => {
      const likeID = like._id.toString();
      const userID = user._id.toString();

      return likeID != userID;
    });
    post.save();
    res.send("Disliked");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//@route     DELETE api/post
//@desc      DELETE a post
//@access    Public

module.exports = router;
