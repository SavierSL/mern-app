import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { logOut } from "../redux/actions/dashboard";
import { getUserName } from "../redux/actions/auth";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const name = useSelector((state) => state.auth.user);
  const handleLogOutBtn = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };
  dispatch(getUserName(token));
  useEffect(() => {
    if (auth === false) {
      return <Redirect to="/" />;
    }
  }, [auth]);
  console.log(token);
  if (auth === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="dashboard">
        <h1 className="heading-primary">Dashboard</h1>
        <h2 className="dashboard__logout" onClick={(e) => handleLogOutBtn(e)}>
          Log out
        </h2>
        <div className="dashboard__container">
          <div className="dashboard__welcome">
            <h1 className="primary-heading">
              {name ? (
                <p>Welcome {name.charAt(0).toUpperCase() + name.slice(1)}</p>
              ) : (
                ""
              )}
            </h1>
          </div>
          <div className="dashboard__createProfile">
            <p>You don't have a profile yet</p>
            <button className="btn-prim">
              <Link to="/create-profile">Create Profile</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
