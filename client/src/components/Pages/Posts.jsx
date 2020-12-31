import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAction, getAllPosts } from "../redux/actions/post";
import { getProfileById } from "../redux/actions/profile";
import PostComponent from "../Pages/PostComponent";

const Posts = () => {
  const token = useSelector((state) => state.auth.token);
  const posts = useSelector((state) => state.post.posts);

  const [click, setClicked] = useState(false);
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    postDescription: "",
  });
  useEffect(() => {
    dispatch(getProfileById(token));
    dispatch(getAllPosts(token));
  }, [click]);

  const profileUser = useSelector((state) => {
    if (state.dashboard.profile.hasOwnProperty("user")) {
      return state.dashboard.profile.user;
    } else {
      return "";
    }
  });
  // state.dashboard.profile.user.name != null
  //   ? state.dashboard.profile.user.name
  //   : ""
  const { postDescription } = post;
  const handlePost = (e) => {
    e.preventDefault();
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleSubmitPost = (e) => {
    e.preventDefault();
    dispatch(postAction(token, post));
    dispatch(getAllPosts(token));
    setPost({ postDescription: "" });
    setClicked(!click);
  };
  posts.reverse();
  return (
    <>
      <div className="posts">
        <h1 className="heading-primary">Write Post</h1>
        <div className="posts__container">
          <div className="posts__container-input">
            <form
              className="form-row"
              action=""
              onSubmit={(e) => handleSubmitPost(e)}
            >
              <textarea
                type="text"
                name="postDescription"
                placeholder="What's on your mind?"
                value={postDescription}
                onChange={(e) => handlePost(e)}
              />
              <button>post</button>
            </form>
          </div>
          {posts.length !== 0
            ? posts.map((post) => {
                return (
                  <PostComponent
                    user={post.name}
                    caption={post.postDescription}
                    likes={post.likes}
                    comments={post.comments}
                    currentUser={profileUser.name}
                    id={post._id}
                    token={token}
                    userID={profileUser._id}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Posts;
