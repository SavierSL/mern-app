import { combineReducers } from "redux";
import alert from "../reducers/alert";
import auth from "../reducers/auth";
import profile from "../reducers/profile";
import dashboard from "../reducers/dashboard";
import profileByID from "../reducers/profileByID";
import post from "../reducers/post";
const rootReducers = combineReducers({
  alert,
  auth,
  profile,
  dashboard,
  profileByID,
  post,
});
export default rootReducers;
