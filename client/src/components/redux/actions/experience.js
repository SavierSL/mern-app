import * as type from "../actions/types";
export const sendExperienceData = ({ token, experienceData }) => {
  return {
    type: type.SEND_EXPERIENCE_DATA_SAGA,
    payload: { token, experienceData },
  };
};
export const deleteExperience = ({ token, id }) => {
  return {
    type: type.DELETE_EXPERIENCE_DATA_SAGA,
    payload: { token, id },
  };
};
