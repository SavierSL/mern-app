import * as types from "../actions/types";
const initialState = [];

const alert = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_ALERT: {
      //payload is {id:1, msg, aletTYpe }
      return [payload];
    }
    case types.REMOVE_ALERT: {
      //payload is id
      return [];
    }
    default: {
      return state;
    }
  }
};
export default alert;
