import * as types from "../actions/types";
const initialState = {
  profile: null,
  loading: true,
  errors: [],
  isProfile: false,
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: payload,
        isProfile: true,
        loading: false,
      };
    }
    case types.CREATE_PROFILE_FAILED: {
      return {
        ...state,
        profile: {},
        loading: false,
        isProfile: false,
        errors: [...payload.errors],
      };
    }
    case types.REMOVE_CREATE_PROFILE_ALERT: {
      return {
        ...state,
        profile: {},
        loading: false,
        isProfile: false,
        errors: [],
      };
    }
    default: {
      return {
        ...state,
        loading: false,
      };
    }
  }
}
