import * as types from "../actions/types";
const initialState = {
  profileIDData: null,
};

export default function profileData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PROFILE_BY_ID_SUCCESS: {
      return {
        ...state,
        profileIDData: payload,
      };
    }
    case types.GET_PROFILE_BY_ID_FAILED: {
      return {
        ...state,
        errors: payload,
      };
    }
    default: {
      return state;
    }
  }
}
