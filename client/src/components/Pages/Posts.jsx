import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAction, getAllPosts } from "../redux/actions/post";
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
    dispatch(getAllPosts(token));
  }, [click]);
  console.log(posts);
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
        <h1 className="heading-primary">Posts</h1>
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
                    user={post.user}
                    caption={post.postDescription}
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
