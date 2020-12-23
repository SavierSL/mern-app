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

export const removeEmailAlert = () => {
  return {
    type: type.REMOVE_EMAIL_ALERT_SAGA,
  };
};

export const removeCreateProfileAlert = () => {
  return {
    type: type.REMOVE_CREATE_PROFILE_ALERT_SAGA,
  };
};

export const removeCreateEducationAlert = () => {
  return {
    type: type.REMOVE_EDUCATION_ALERT_SAGA,
  };
};
