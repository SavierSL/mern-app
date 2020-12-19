import { combineReducers } from "redux";
import alert from "../reducers/alert";
import auth from "../reducers/auth";
import profile from "../reducers/profile";
const rootReducers = combineReducers({
  alert,
  auth,
  profile,
});
export default rootReducers;
