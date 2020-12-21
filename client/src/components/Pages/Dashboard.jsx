import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { logOut } from "../redux/actions/dashboard";
import { getUserName } from "../redux/actions/auth";
import { removeCreateProfileAlert } from "../redux/actions/alert";
import { getProfileById } from "../redux/actions/profile";
import profile from "../redux/reducers/profile";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const name = useSelector((state) => state.auth.user);
  const isProfile = useSelector((state) => state.profile.isProfile);
  const loading = useSelector((state) => state.dashboard.loading);
  const profileData = useSelector((state) => state.dashboard.profile);

  const handleLogOutBtn = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  if (isProfile === true) {
    dispatch(removeCreateProfileAlert());
  }
  dispatch(getUserName(token));
  useEffect(() => {
    if (auth === false) {
      return <Redirect to="/" />;
    }
    dispatch(getProfileById(token));
  }, [auth]);
  console.log(token);
  if (auth === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {loading ? (
        ""
      ) : (
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
            {profileData.hasOwnProperty("msg") && !loading ? (
              <div className="dashboard__createProfile">
                <p>You don't have a profile yet</p>
                <button className="btn-prim">
                  <Link to="/create-profile">Create Profile</Link>
                </button>
              </div>
            ) : (
              <div className="dashboard__editProfile">
                <button className="btn-prim">
                  <Link to="/create-profile">Update Profile</Link>
                </button>
                <button className="btn-prim">
                  <Link to="/education">Add Your Education</Link>
                </button>
                <button className="btn-prim">
                  <Link to="/experience">Add Your Experience</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
