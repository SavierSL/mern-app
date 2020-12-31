import React from "react";

const CommentsComponent = ({ comments, sameID }) => {
  return (
    <>
      <div className="comments">
        <h2>Comments</h2>
        {comments.map((comment) => {
          return (
            <>
              <span>{comment.name}</span>
              <div className="comments__detailsContainer">
                <p>{comment.text}</p>
                {comment.user === sameID ? <button>Del</button> : ""}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CommentsComponent;
