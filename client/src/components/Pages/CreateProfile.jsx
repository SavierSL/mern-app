import React, { useState } from "react";
import { createProfile } from "../redux/actions/profile";
import { useSelector, useDispatch } from "react-redux";

const CreateProfile = () => {
  const [profileForm, setProfileForm] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [social, setSocial] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  //handling form
  const handleCreateForm = (e) => {
    e.preventDefault();
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };
  const handleSocial = (e) => {
    e.preventDefault();
    setSocial(!social);
  };

  console.log(profileForm);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
  } = profileForm;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(createProfile(profileForm, token));
  };
  return (
    <>
      <div className="createProfile">
        <h1 className="heading-primary">Create Profile</h1>
        <div className="createProfile__form">
          <form
            action=""
            className="form-row"
            onSubmit={(e) => handleSubmitForm(e)}
          >
            <div className="form-row__form-group">
              <select
                name="status"
                value={status}
                onChange={(e) => handleCreateForm(e)}
              >
                <option>* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
              <small className="form-row__form-text">
                Give us an idea of where you are at in your career
              </small>
            </div>
            <div className="form-row__form-group">
              <input
                type="text"
                placeholder="Company"
                name="company"
                value={company}
                onChange={(e) => handleCreateForm(e)}
              />
              <small className="form-row__form-text">
                Could be your own company or one you work for
              </small>
            </div>
            <div className="form-row__form-group">
              <input
                type="text"
                placeholder="Website"
                name="website"
                value={website}
                onChange={(e) => handleCreateForm(e)}
              />
              <small className="form-row__form-text">
                Could be your own company or own website
              </small>
            </div>
            <div className="form-row__form-group">
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={(e) => handleCreateForm(e)}
              />
              <small className="form-row__form-text">
                CIty &amp; state suggested (eg. Boston, MA
              </small>
            </div>
            <div className="form-row__form-group">
              <input
                type="text"
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={(e) => handleCreateForm(e)}
              />
              <small className="form-row__form-text">
                Please use comma separated values (eg. CSS, JS, REACT)
              </small>
            </div>
            <div className="form-row__form-group">
              <input
                type="text"
                placeholder="Github Username"
                name="githubusername"
                value={githubusername}
                onChange={(e) => handleCreateForm(e)}
              />
              <small className="form-row__form-text">
                Could be your own company or one you work for
              </small>
            </div>
            <div className="form-row__form-group">
              <textarea
                type="text"
                placeholder="Bio"
                name="bio"
                value={bio}
                onChange={(e) => handleCreateForm(e)}
              />
              <small className="form-row__form-text">
                Tell us a little about yourself
              </small>
            </div>
            <div className="form-row__form-group">
              <button onClick={(e) => handleSocial(e)}>
                Add social network links{" "}
                <span style={{ fontSize: "1rem", color: "black" }}>
                  optional
                </span>
              </button>
            </div>
            {social ? (
              <div className="social">
                <div className="social-group">
                  <i className="fab fa-twitter fa-4x" />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    value={twitter}
                    name="twitter"
                    onChange={(e) => handleCreateForm(e)}
                  />
                </div>
                <div className="social-group">
                  <i className="fab fa-facebook fa-4x" />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    value={facebook}
                    name="facebook"
                    onChange={(e) => handleCreateForm(e)}
                  />
                </div>
                <div className="social-group">
                  <i className="fab fa-youtube fa-4x" />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    value={youtube}
                    name="youtube"
                    onChange={(e) => handleCreateForm(e)}
                  />
                </div>
                <div className="social-group">
                  <i className="fab fa-linkedin fa-4x" />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    name=""
                    value={linkedin}
                    onChange={(e) => handleCreateForm(e)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <button onClick={(e) => handleSubmitForm(e)}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
