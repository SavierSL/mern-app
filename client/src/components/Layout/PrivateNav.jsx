import React from "react";
import { useSelector } from "react-redux";
import Nav from "../Layout/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const PrivateNav = () => {
  const isAuthTrue = useSelector((state) => state.auth.isAuth);
  return (
    <>
      <div>
        {isAuthTrue ? <Route path="/:dashboard" component={Nav} /> : ""}
      </div>
    </>
  );
};

export default PrivateNav;
