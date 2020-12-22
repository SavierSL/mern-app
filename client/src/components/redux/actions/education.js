import * as type from "../actions/types";

export const sendEducationData = ({ token, educationData }) => {
  return {
    type: type.SEND_EDUCATION_DATA_SAGA,
    payload: { token, educationData },
  };
};

export const deleteEducation = ({ token, id }) => {
  return {
    type: type.DELETE_EDUCATION_DATA_SAGA,
    payload: { token, id },
  };
};
