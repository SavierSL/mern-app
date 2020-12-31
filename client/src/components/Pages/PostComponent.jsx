import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllPosts, postComment, likeComment } from "../redux/actions/post";

import CommentsComponent from "../Pages/Box/CommentsComponent";

const PostComponent = ({
  user,
  caption,
  likes,
  comments,
  currentUser,
  id,
  token,
  userID,
}) => {
  const [isComment, setIsComment] = useState(false);

  let [click, setClicked] = useState(0);
  const [text, setText] = useState({
    text: "",
  });
  useEffect(() => {
    dispatch(getAllPosts(token));
  }, [click]);
  const profiles = useSelector((state) => state.profile.allProfile);
  const dispatch = useDispatch();
  const isLiked = likes.filter((item) => {
    return item._id === userID;
  });
  console.log(isLiked);

  const handleComment = (e) => {
    e.preventDefault();
    setText({ ...text, [e.target.name]: e.target.value });
  };
  const handlePostComment = () => {
    dispatch(postComment(text, token, id));
    setText({ text: "" });
    setClicked((click += 1));
    dispatch(getAllPosts(token));
  };
  const handleViewCommentBtn = (e) => {
    e.preventDefault();
    setIsComment(!isComment);
    console.log(isComment);
  };
  const handleLikeBtn = (e) => {
    e.preventDefault();
    dispatch(likeComment(token, id));
    setClicked((click += 1));
    dispatch(getAllPosts(token));
  };

  return (
    <>
      <div className="postComponent">
        <h2 className="heading-primary">{user}</h2>
        <h3>{caption}</h3>
        <div className="postComponent__buttonContainer">
          <div className="postComponent__buttonContainer-group">
            <p>{`Likes ${likes.length}`}</p>
            <button onClick={(e) => handleLikeBtn(e)}>
              {isLiked.length !== 0 ? "Liked" : "Like"}
            </button>
          </div>
          <div className="postComponent__buttonContainer-group">
            <p>{`Comments ${comments.length}`}</p>
            <button onClick={(e) => handleViewCommentBtn(e)}>
              View Comments
            </button>
          </div>
        </div>
        {isComment ? <CommentsComponent comments={comments} /> : ""}
        <span>{currentUser}</span>{" "}
        <input
          type="text"
          name="text"
          value={text.text}
          placeholder="write comment"
          onChange={(e) => handleComment(e)}
        />
        <button onClick={(e) => handlePostComment(e)}>post comment</button>
      </div>
    </>
  );
};

export default PostComponent;
