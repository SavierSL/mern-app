import * as types from "../actions/types";

const initialState = {
  profile: [],
  loading: true,
  deleteMsg: null,
  errors: [],
  educationAdded: false,
  experienceAdded: false,
};

export default function dashboard(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PROFILE: {
      return {
        ...state,
        profile: payload,
        loading: false,
        educationAdded: false,
        experienceAdded: false,
      };
    }
    case types.SEND_EDUCATION_DATA_SUCCESS: {
      return {
        ...state,
        profile: payload,
        loading: false,
        educationAdded: true,
      };
    }
    case types.SEND_EDUCATION_DATA_FAILED: {
      return {
        ...state,
        errors: [payload.errors],
        loading: false,
        educationAdded: false,
      };
    }
    case types.SEND_EXPERIENCE_DATA_SUCCESS: {
      return {
        ...state,
        profile: payload,
        loading: false,
        educationAdded: true,
        experienceAdded: true,
      };
    }
    case types.SEND_EXPERIENCE_DATA_FAILED: {
      return {
        ...state,
        errors: [payload.errors],
        loading: false,
        educationAdded: false,
        experienceAdded: false,
      };
    }
    case types.REMOVE_EDUCATION_ALERT: {
      return {
        ...state,
        errors: [],
        loading: false,
      };
    }
    case types.REMOVE_EXPERIENCE_ALERT: {
      return {
        ...state,
        errors: [],
        loading: false,
      };
    }
    case types.DELETE_EDUCATION_DATA: {
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    }
    case types.DELETE_EXPERIENCE_DATA: {
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
