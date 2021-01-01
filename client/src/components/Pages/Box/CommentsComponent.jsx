import React from "react";

const CommentsComponent = ({ comments, sameID }) => {
  return (
    <>
      <div className="comments">
        <h2>Comments</h2>
        {comments.map((comment) => {
          return (
            <div className="comments__detailsContainer">
              <span>{comment.name}</span>
              <div className="comments__detailsContainer-comment">
                <p>{comment.text}</p>
                {comment.user === sameID ? <button>delete</button> : ""}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommentsComponent;
