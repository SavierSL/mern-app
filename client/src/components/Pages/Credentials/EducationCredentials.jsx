import React from "react";
import formatDate from "../../Utils/FormatDate";
import { useSelector, useDispatch } from "react-redux";
import { deleteEducation } from "../../redux/actions/education";
import { getProfileById } from "../../redux/actions/profile";

const EducationCredetials = ({
  id,
  from,
  to,
  school,
  current,
  description,
  degree,
  click,
}) => {
  return (
    <>
      <div className="Credentials" key={id}>
        <h1 className="primary-heading">Education Credentials</h1>
        <div className="Credentials__table">
          <div className="Credentials__table-grp">
            <div className="Credentials__table-grp-title">
              <h1 className="primary-heading">School</h1>
            </div>
            <h2>{school}</h2>
          </div>
          <div className="Credentials__table-grp">
            <div className="Credentials__table-grp-title">
              <h1 className="primary-heading">Degree</h1>
            </div>
            <h2>{degree}</h2>
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

export default EducationCredetials;
