import * as type from "./types";

export const setAlert = (msg, alertType) => {
  return {
    type: type.SET_ALERT_SAGA,
    payload: { msg, alertType },
  };
};

export const removeAlert = () => {
  return {
    type: type.REMOVE_ALERT_SAGA,
  };
};
