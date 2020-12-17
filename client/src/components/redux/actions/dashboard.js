import * as types from "./types";

export const logOut = () => {
  return { type: types.LOG_OUT_SAGA };
};
