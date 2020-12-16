import { combineReducers } from "redux";
import alert from "../reducers/alert";
import auth from "../reducers/auth";
const rootReducers = combineReducers({
  alert,
  auth,
});
export default rootReducers;
