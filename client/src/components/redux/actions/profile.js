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

export const updateProfile = (token, profileData) => {
  return {
    type: types.UPDATE_PROFILE_SAGA,
    payload: { token, profileData },
  };
};

export const getAllProfiles = () => {
  return { type: types.GET_ALL_PROFILES_SAGA };
};

export const viewProfile = (profileID) => {
  return {
    type: types.GET_PROFILE_BY_ID_SAGA,
    payload: { profileID },
  };
};
