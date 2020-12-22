import * as type from "../actions/types";

export const sendEducationData = ({ token, educationData }) => {
  return {
    type: type.SEND_EDUCATION_DATA_SAGA,
    payload: { token, educationData },
  };
};
