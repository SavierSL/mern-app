import * as types from "./types";

export const postAction = (token, postContent) => {
  return {
    type: types.POST_SAGA,
    payload: { token, postContent },
  };
};

export const getAllPosts = (token) => {
  return {
    type: types.GET_ALL_POST_SAGA,
    payload: { token },
  };
};
export const postComment = (text, token, postID) => {
  return {
    type: types.POST_COMMENT_SAGA,
    payload: { text, token, postID },
  };
};

export const likeComment = (token, id) => {
  return {
    type: types.LIKE_POST_SAGA,
    payload: { token, id },
  };
};
