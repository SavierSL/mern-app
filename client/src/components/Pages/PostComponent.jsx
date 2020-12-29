import React from "react";

const PostComponent = ({ user, caption }) => {
  return (
    <>
      <div className="postComponent">
        <h2 className="heading-primary">Xavier</h2>
        <h3>{caption}</h3>
      </div>
    </>
  );
};

export default PostComponent;
