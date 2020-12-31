import React from "react";

const CommentsComponent = ({ comments }) => {
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
                <button>Del</button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CommentsComponent;
