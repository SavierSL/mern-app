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
  avatar,
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

  const handleComment = (e) => {
    e.preventDefault();
    setText({ ...text, [e.target.name]: e.target.value });
  };
  const handlePostComment = (e) => {
    e.preventDefault();
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
            <button className="btn-secondary" onClick={(e) => handleLikeBtn(e)}>
              {isLiked.length !== 0
                ? `Liked ${likes.length}`
                : `Likes ${likes.length}`}
            </button>
          </div>
          <div className="postComponent__buttonContainer-group">
            <button
              className="btn-secondary"
              onClick={(e) => handleViewCommentBtn(e)}
            >
              {`Comments ${comments.length}`}
            </button>
          </div>
        </div>
        {isComment ? (
          <CommentsComponent comments={comments} sameID={userID} />
        ) : (
          ""
        )}
        <form action="" onSubmit={(e) => handlePostComment(e)}>
          <div className="comment-container">
            <span>
              <img className="profile-primary" src={avatar} alt="" />
            </span>{" "}
            <input
              className="input-primary"
              type="text"
              name="text"
              value={text.text}
              placeholder="write comment"
              onChange={(e) => handleComment(e)}
            />
            <button className="btn-tertiary"></button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostComponent;
