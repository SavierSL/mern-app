import * as types from "../actions/types";

const initialState = {
  profile: null,
  loading: true,
  deleteMsg: null,
};

export default function dashboard(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PROFILE: {
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    }
    case types.SEND_EDUCATION_DATA: {
      return {
        ...state,
        profile: payload,
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
    default: {
      return state;
    }
  }
}
