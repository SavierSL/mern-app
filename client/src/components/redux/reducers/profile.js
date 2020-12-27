import * as types from "../actions/types";
const initialState = {
  profile: null,
  loading: true,
  errors: [],
  isProfile: false,
  isUpdated: false,
  allProfile: null,
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
    case types.UPDATE_PROFILE_FAILED: {
      return {
        ...state,
        loading: false,
        isProfile: true,
        errors: [...payload.errors],
      };
    }
    case types.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: payload,
        loading: false,
        isProfile: true,
        errors: [],
      };
    }
    case types.GET_ALL_PROFILES: {
      return {
        ...state,
        allProfile: payload,
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
