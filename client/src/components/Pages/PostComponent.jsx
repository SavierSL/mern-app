import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../redux/actions/post";
import { postComment } from "../redux/actions/post";

const PostComponent = ({
  user,
  caption,
  likes,
  comments,
  currentUser,
  id,
  token,
}) => {
  let [click, setClicked] = useState(0);
  const [text, setText] = useState({
    text: "",
  });
  useEffect(() => {
    dispatch(getAllPosts(token));
  }, [click]);
  const profiles = useSelector((state) => state.profile.allProfile);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();
    setText({ ...text, [e.target.name]: e.target.value });
  };
  const handlePostComment = (e) => {
    e.preventDefault();
    dispatch(postComment(text, token, id));
    setText({ text: "" });
    setClicked((click += 1));
  };
  return (
    <>
      <div className="postComponent">
        <h2 className="heading-primary">{user}</h2>
        <h3>{caption}</h3>
        <div className="postComponent__buttonContainer">
          <div className="postComponent__buttonContainer-group">
            <p>{`Likes ${likes.length}`}</p>
            <button>View Likes</button>
          </div>
          <div className="postComponent__buttonContainer-group">
            <p>{`Comments ${comments.length}`}</p>
            <button>View Comments</button>
          </div>
        </div>
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
