import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendEducationData } from "../../redux/actions/education";
import { getUserName } from "../../redux/actions/auth";
import { removeCreateEducationAlert } from "../../redux/actions/alert";
import Alert from "../../Layout/Alert";

const Education = () => {
  const errors = useSelector((state) => state.dashboard.errors);
  const token = useSelector((state) => state.auth.token);
  const education = useSelector((state) => state.dashboard.educationAdded);
  const dispatch = useDispatch();
  const [educationData, setEducationData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = educationData;

  if (education) {
    return <Redirect to="/dashboard" />;
  }
  const handleForm = (e) => {
    e.preventDefault();
    setEducationData({ ...educationData, [e.target.name]: e.target.value });
  };
  console.log(educationData);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(sendEducationData({ token, educationData }));
    dispatch(getUserName(token));
  };

  const handleRemoveEducationAlert = (e) => {
    e.preventDefault();
    dispatch(removeCreateEducationAlert());
  };
  return (
    <>
      <div className="Education">
        <h1 className="primary-heading">Add Your Education</h1>
        <p>Add any school or bootcamp that you have attended</p>
        <h2>Required field</h2>
        {errors.length !== 0
          ? errors.map((error) => {
              return <Alert alert={error} />;
            })
          : ""}
        <div className="Education__form">
          <form
            action=""
            className="form-row"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <input
              type="text"
              name="school"
              value={school}
              onChange={(e) => handleForm(e)}
              placeholder="School or Bootcamp"
              onClick={(e) => handleRemoveEducationAlert(e)}
            />
            <input
              type="text"
              name="degree"
              value={degree}
              onChange={(e) => handleForm(e)}
              placeholder="Degree or Certificate"
              onClick={(e) => handleRemoveEducationAlert(e)}
            />
            <input
              type="text"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={(e) => handleForm(e)}
              placeholder="Field of Study"
            />
            <div className="form-row__form-group">
              <label htmlFor="date">
                <h2>From Date</h2>
              </label>
              <input
                style={{ margin: "0" }}
                name="from"
                value={from}
                onChange={(e) => handleForm(e)}
                type="date"
                placeholder="dd/mm/yy"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "12rem",
                height: "100%",
                alignItems: "baseline",
              }}
            >
              <input
                style={{
                  height: "1rem",
                  width: "2rem",
                  marginBottom: "1rem",
                }}
                type="checkbox"
                name="current"
                value={current}
                onChange={() =>
                  setEducationData({ ...educationData, current: !current })
                }
              />
              <h2>Current Job</h2>
            </div>
            <div className="form-row__form-group">
              <label htmlFor="date">
                <h2>To Date</h2>
              </label>
              <input
                style={{ margin: "0" }}
                name="to"
                value={to}
                onChange={(e) => handleForm(e)}
                type="date"
                placeholder="dd/mm/yy"
              />
            </div>
            <textarea
              name="description"
              value={description}
              onChange={(e) => handleForm(e)}
              onClick={(e) => handleRemoveEducationAlert(e)}
              id=""
              cols="30"
              rows="10"
              placeholder="Program Description"
            ></textarea>
            <button>Submit</button>

            <Link
              to="/dashboard"
              className="create"
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "#30475e",
                width: "100%",
                display: "block",
                textAlign: "center",
                padding: "1rem",
                fontSize: "1.5rem",
              }}
            >
              Back
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Education;
