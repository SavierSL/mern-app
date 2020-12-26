import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const UpdateProfile = () => {
  const profileData = useSelector((state) => state.dashboard.profile);
  const [profile, setProfile] = useState(profileData);
  console.log(profile);
  return (
    <>
      <div className="createProfile">
        <h1 style={{ marginBottom: "4rem" }} className="heading-primary">
          Update Profile
        </h1>
        <div className="createProfile__form">
          <form action="" className="form-row">
            <div className="form-row__form-group">
              <select name="status" value={profile.status}>
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
                value={profile.company}
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
                value={profile.website}
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
                value={profile.location}
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
                value={profile.skills}
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
                value={profile.githubusername}
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
                value={profile.bio}
              />
              <small className="form-row__form-text">
                Tell us a little about yourself
              </small>
            </div>
            <div className="form-row__form-group">
              <button>
                Update social network links{" "}
                <span style={{ fontSize: "1rem", color: "black" }}>
                  optional
                </span>
              </button>
            </div>
            {profile.social ? (
              <div className="social">
                <div className="social-group">
                  <i className="fab fa-twitter fa-4x" />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    value={profile.social.twitter}
                    name="twitter"
                  />
                </div>
                <div className="social-group">
                  <i className="fab fa-facebook fa-4x" />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    value={profile.social.facebook}
                    name="facebook"
                  />
                </div>
                <div className="social-group">
                  <i className="fab fa-youtube fa-4x" />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    value={profile.social.youtube}
                    name="youtube"
                  />
                </div>
                <div className="social-group">
                  <i className="fab fa-linkedin fa-4x" />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    name=""
                    value={profile.social.linkedin}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <button>Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
