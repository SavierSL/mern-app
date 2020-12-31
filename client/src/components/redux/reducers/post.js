import * as types from "../actions/types";
const initialState = {
  isLoading: true,
  posts: [],
  errors: [],
  likes: [],
  comments: [],
};

export default function post(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.POST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case types.POST_FAILED: {
      return {
        ...state,
        errors: [payload],
        isLoading: false,
      };
    }
    case types.GET_ALL_POST_SUCCESS: {
      return {
        isLoading: false,
        errors: [],
        posts: payload,
      };
    }
    case types.GET_ALL_POST_FAILED: {
      return {
        ...state,
        isLoading: false,
        errors: [payload],
      };
    }
    case types.POST_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        comments: payload,
      };
    }
    case types.POST_COMMENT_FAILED: {
      return {
        ...state,
        isLoading: false,
        errors: [payload],
      };
    }
    case types.LIKE_POST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errors: [],
      };
    }
    case types.LIKE_POST_FAILED: {
      return {
        ...state,
        isLoading: false,
        errors: [payload],
      };
    }
    default: {
      return state;
    }
  }
}
