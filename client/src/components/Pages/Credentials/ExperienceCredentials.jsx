import React from "react";
import formatDate from "../../Utils/FormatDate";

const ExperienceCredentials = ({
  id,
  from,
  to,
  title,
  current,
  description,
  company,
}) => {
  return (
    <>
      <div className="Credentials" key={id}>
        <div className="Credentials__table">
          <div className="Credentials__table-grp">
            <div className="Credentials__table-grp-title">
              <h1 className="primary-heading">School</h1>
            </div>
            <h2>{title}</h2>
          </div>
          <div className="Credentials__table-grp">
            <div className="Credentials__table-grp-title">
              <h1 className="primary-heading">Degree</h1>
            </div>
            <h2>{company}</h2>
          </div>
          <div className="Credentials__table-grp">
            <div className="Credentials__table-grp-title">
              <h1 className="primary-heading">Years</h1>
            </div>
            <h2>
              {formatDate(from)} - {formatDate(to)}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceCredentials;
