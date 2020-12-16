import * as types from "./types";

export const registerAuth = ({ name, email, password }) => {
  return {
    type: types.REGISTER_SAGA,
    payload: { name, email, password },
  };
};
