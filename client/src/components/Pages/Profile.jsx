import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EducationTab from "./ProfileTabs/Education";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExperienceTab from "./ProfileTabs/Experience";

const Profile = () => {
  const [educationTab, setEducationTab] = useState(true);
  const profileData = useSelector((state) => state.profileByID.profileIDData);
  console.log(profileData);
  const {
    user,
    company,
    website,
    location,
    githubusername,
    experience,
    education,
    socail,
    skills,
    bio,
    status,
  } = profileData ? profileData : "";

  const handleExpBtn = (e) => {
    e.preventDefault();
    setEducationTab(false);
  };
  const handleEdBtn = (e) => {
    e.preventDefault();
    setEducationTab(true);
  };
  return (
    <>
      <div className="profile">
        <h1 className="heading-primary">Profile</h1>

        {profileData ? (
          <>
            <div className="profile__container">
              <div className="profile__container-1st">
                <img src={user.avatar} alt="" />
                <div className="profile__container-skillSet">
                  <h2>Skill Set</h2>
                  <div className="profile__container-skillSets">
                    {skills.map((skill) => {
                      return <h3 className="skills">{skill}</h3>;
                    })}
                  </div>
                </div>
              </div>
              <div className="profile__container-details">
                <h1>{user.name}</h1>
                <h1>{status}</h1>
                <h2>{bio}</h2>
                <h2>{`Github username: ${githubusername}`}</h2>
                <div className="line"></div>
                <div className="profile__container-details-buttons">
                  <button onClick={(e) => handleEdBtn(e)}>Education</button>

                  <button onClick={(e) => handleExpBtn(e)}>Experience</button>
                </div>
                <div className="profile__container-details-creden">
                  {educationTab ? <EducationTab /> : <ExperienceTab />}
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Profile;
