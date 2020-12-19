import * as types from "../actions/types";
const initialState = {
  profile: {},
  loading: true,
  errors: [],
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    }
    case types.CREATE_PROFILE_FAILED: {
      return {
        ...state,
        profile: {},
        loading: false,
        errors: [...payload.errors],
      };
    }
    default: {
      return state;
    }
  }
}
