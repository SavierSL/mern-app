import * as types from "../actions/types";
const initialState = {
  isLoading: true,
  posts: [],
  errors: [],
};

export default function post(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
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
        errors: [payload],
      };
    }
    default: {
      return state;
    }
  }
}
