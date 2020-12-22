import React from "react";
import formatDate from "../../Utils/FormatDate";

const EducationCredetials = ({ profileData }) => {
  return (
    <>
      {profileData.map((data) => {
        return (
          <div className="Credentials">
            <h1 className="primary-heading">Education Credentials</h1>
            <div className="Credentials__table">
              <div className="Credentials__table-grp">
                <div className="Credentials__table-grp-title">
                  <h1 className="primary-heading">School</h1>
                </div>
                <h2>{data.school}</h2>
              </div>
              <div className="Credentials__table-grp">
                <div className="Credentials__table-grp-title">
                  <h1 className="primary-heading">Degree</h1>
                </div>
                <h2>{data.degree}</h2>
              </div>
              <div className="Credentials__table-grp">
                <div className="Credentials__table-grp-title">
                  <h1 className="primary-heading">Years</h1>
                </div>
                <h2>
                  {formatDate(data.from)} - {formatDate(data.to)}
                </h2>
              </div>
              <div className="Credentials__table-delete">
                <h1>DEL</h1>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EducationCredetials;
