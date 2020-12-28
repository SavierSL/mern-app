import React from "react";
import "./sass/main.scss";
import Header from "./components/Layout/Header";
import Register from "./components/auth/Register";
import Dashboard from "./components/Pages/Dashboard";
import CreateProfile from "./components/Pages/CreateProfile";
import Education from "./components/Pages/DashboardEdits/Education";
import Experience from "./components/Pages/DashboardEdits/Experience";
import UpdateProfile from "./components/Pages/UpdateProfile";
import Profiles from "./components/Pages/Profiles";
import Profile from "./components/Pages/Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../src/components/redux/store";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Header} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/create-profile" component={CreateProfile} />
          <Route exact path="/Education" component={Education} />
          <Route exact path="/Experience" component={Experience} />
          <Route exact path="/update-profile" component={UpdateProfile} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profiles/profile" component={Profile} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
