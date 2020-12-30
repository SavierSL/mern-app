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
      const user = await User.findById(req.user.id);
      const post = {
        user: req.user.id,
        name: user.name,
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

//@route     DELETE api/post/:post_id
//@desc      DELETE a post
//@access    Public
router.put("/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.post_id });
    const user = await User.findOne({ _id: req.user.id }).select("-password");
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

//@route     POST api/comment/:post_id
//@desc      POST make a comment
//@access    Public
router.post(
  "/comment/:post_id",
  [auth, [check("text", "Comment is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      let post = await Post.findById(req.params.post_id);
      const userObject = await User.findById(req.user.id).select([
        "-password",
        "-date",
      ]);
      if (!post) {
        return res.status(400).send("Invalid ID");
      }
      const comment = {
        user: req.user.id,
        text: req.body.text,
        avatar: userObject.avatar,
        name: userObject.name,
      };
      post.comments.unshift(comment);
      const newPost = await post.save();
      res.send(newPost.comments);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

//@route     DELETE api/comment/:post_id/:comment_id
//@desc      DELETE a comment
//@access    Public
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).send("Post can't be found");
    }
    const newComments = post.comments.filter((comment) => {
      return comment.id != req.params.comment_id;
    });
    if (newComments.length === post.comments.length) {
      return res.status(400).send("There is no comment to delete");
    }
    post.comments = newComments;
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send({ errors: error.message });
  }
});

//@route     DELETE api/comment/:post_id/:comment_id
//@desc      DELETE a comment
//@access    Public
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res.status(400).send({ msg: "Can't find posts" });
    }
    res.send(posts.reverse());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
