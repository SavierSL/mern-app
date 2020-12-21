import * as types from "../actions/types";

export const createProfile = (profileData, token) => {
  return {
    type: types.CREATE_PROFILE_SAGA,
    payload: { profileData, token },
  };
};

export const getProfileById = (token) => {
  return {
    type: types.GET_PROFILE_SAGA,
    payload: token,
  };
};
