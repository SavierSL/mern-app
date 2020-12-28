import React from "react";
import EducationCredentials from "../Credentials/EducationCredentials";
import { useSelector } from "react-redux";
const EducationTab = () => {
  const profileData = useSelector((state) => state.profileByID.profileIDData);
  const loading = useSelector((state) => state.dashboard.loading);
  return (
    <>
      <div className="profile__container-details-expanded">
        <h1 className="heading-primary">Education</h1>
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
                  <EducationCredentials
                    key={_id}
                    id={_id}
                    from={from}
                    to={to}
                    school={school}
                    current={current}
                    description={description}
                    degree={degree}
                  />
                </>
              );
            })}
      </div>
    </>
  );
};

export default EducationTab;
