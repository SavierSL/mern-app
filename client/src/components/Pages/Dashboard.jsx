import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getUserName } from "../redux/actions/auth";
import { removeCreateProfileAlert } from "../redux/actions/alert";
import { deleteEducation } from "../redux/actions/education";
import { deleteExperience } from "../redux/actions/experience";
import { getProfileById } from "../redux/actions/profile";

import EducationCredetials from "./Credentials/EducationCredentials";
import ExperienceCredentials from "./Credentials/ExperienceCredentials";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const name = useSelector((state) => state.auth.user);
  const isProfile = useSelector((state) => state.profile.isProfile);
  const loading = useSelector((state) => state.dashboard.loading);
  const profileData = useSelector((state) => state.dashboard.profile);

  if (isProfile === true) {
    dispatch(removeCreateProfileAlert());
  }

  useEffect(() => {
    if (auth === false) {
      return <Redirect to="/" />;
    }
    dispatch(getProfileById(token));
    dispatch(getUserName(token));
  }, []);

  if (auth === false) {
    return <Redirect to="/" />;
  }

  const handleDeleteButtonEd = (id) => {
    dispatch(deleteEducation({ token, id }));
    console.log("clicked");
  };
  const handleDeleteButtonExp = (id) => {
    dispatch(deleteExperience({ token, id }));
  };
  return (
    <>
      {loading ? (
        ""
      ) : (
        <div className="dashboard">
          <h1 className="heading-primary">Dashboard</h1>

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
                  <Link to="/update-profile">Update Profile</Link>
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
          <h1 style={{ marginTop: "2rem" }} className="primary-heading">
            Education Credentials
          </h1>
          {profileData.hasOwnProperty("msg") && !loading
            ? ""
            : profileData.education.length === 0
            ? ""
            : profileData.education.map((data) => {
                const {
                  _id,
                  from,
                  to,
                  school,
                  current,
                  description,
                  degree,
                } = data;
                return (
                  <>
                    <div className="Credentials__table-two">
                      <EducationCredetials
                        key={_id}
                        id={_id}
                        from={from}
                        to={to}
                        school={school}
                        current={current}
                        description={description}
                        degree={degree}
                      />
                      <div
                        onClick={() => handleDeleteButtonEd(_id)}
                        className="Credentials__table-delete"
                      >
                        <h1>DELETE</h1>
                      </div>
                    </div>
                  </>
                );
              })}
          <h1 style={{ marginTop: "2rem" }} className="primary-heading">
            Experience Credentials
          </h1>
          {profileData.hasOwnProperty("msg") && !loading
            ? ""
            : profileData.experience.length === 0
            ? ""
            : profileData.experience.map((data) => {
                const {
                  _id,
                  from,
                  to,
                  company,
                  current,
                  description,
                  location,
                  title,
                } = data;
                return (
                  <>
                    <div className="Credentials__table-two">
                      <ExperienceCredentials
                        key={_id}
                        id={_id}
                        from={from}
                        to={to}
                        company={company}
                        current={current}
                        description={description}
                        degree={location}
                        title={title}
                      />
                      <div
                        onClick={() => handleDeleteButtonExp(_id)}
                        className="Credentials__table-delete"
                      >
                        <h1>DEL</h1>
                      </div>
                    </div>
                  </>
                );
              })}
        </div>
      )}
    </>
  );
};

export default Dashboard;
