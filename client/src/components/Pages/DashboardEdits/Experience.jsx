import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendExperienceData } from "../../redux/actions/experience";
import { getUserName } from "../../redux/actions/auth";
import Alert from "../../Layout/Alert";

const Experience = () => {
  const token = useSelector((state) => state.auth.token);
  const errors = useSelector((state) => state.dashboard.errors);
  const dispatch = useDispatch();
  const [experienceData, setExperienceData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  } = experienceData;

  const handleForm = (e) => {
    e.preventDefault();
    setExperienceData({ ...experienceData, [e.target.name]: e.target.value });
  };
  console.log(experienceData);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(sendExperienceData({ token, experienceData }));
    dispatch(getUserName(token));
  };
  return (
    <>
      <div className="Education">
        <h1 className="primary-heading">Add Your Experience</h1>
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
              name="title"
              value={title}
              onChange={(e) => handleForm(e)}
              placeholder="Job Title"
            />
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => handleForm(e)}
              placeholder="Company"
            />
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => handleForm(e)}
              placeholder="Location"
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
                  setExperienceData({ ...experienceData, current: !current })
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

export default Experience;
