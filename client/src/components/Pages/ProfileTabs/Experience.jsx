import React from "react";
import ExperienceCredentials from "../Credentials/ExperienceCredentials";
import { useSelector } from "react-redux";

const ExperienceTab = () => {
  const profileData = useSelector((state) => state.profileByID.profileIDData);
  const loading = useSelector((state) => state.dashboard.loading);
  return (
    <>
      <div className="profile__container-details-expanded">
        <h1 className="heading-primary">Experience</h1>
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
                </>
              );
            })}
      </div>
    </>
  );
};

export default ExperienceTab;
