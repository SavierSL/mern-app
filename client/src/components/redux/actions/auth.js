import * as types from "./types";

export const registerAuth = ({ name, email, password }) => {
  return {
    type: types.REGISTER_SAGA,
    payload: { name, email, password },
  };
};

export const logInAuth = ({ email, password }) => {
  return {
    type: types.LOG_IN_SAGA,
    payload: { email, password },
  };
};
