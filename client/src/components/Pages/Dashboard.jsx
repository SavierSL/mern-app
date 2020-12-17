import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logOut } from "../redux/actions/dashboard";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const handleLogOutBtn = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  if (auth === false) {
    return <Redirect to="/" />;
  }
  console.log(auth);

  return (
    <>
      <div className="dashboard">
        <h1 className="heading-primary">Dashboard</h1>
        <h2 className="dashboard__logout" onClick={(e) => handleLogOutBtn(e)}>
          Log out
        </h2>
      </div>
    </>
  );
};

export default Dashboard;
