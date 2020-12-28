import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfiles, viewProfile } from "../redux/actions/profile";

const Profiles = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const allProfiles = useSelector((state) => state.profile.allProfile);
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [redirect]);
  const handleViewProfile = (e, profileID) => {
    const path = "/profiles/profile";

    e.preventDefault();
    setRedirect(!redirect);
    dispatch(viewProfile(profileID));
    history.push(path);
  };

  return (
    <>
      <div className="profiles">
        <h1 className="heading-primary">Developers</h1>
        {allProfiles != null
          ? allProfiles.map((data) => {
              console.log(data.user.avatar);
              return (
                <div className="profiles__profile">
                  <img
                    src={data.user.avatar}
                    alt=""
                    className="profiles__profile-img"
                  />
                  <div className="profiles__profile-details">
                    <h2>{data.user.name}</h2>
                    <p>{data.bio}</p>
                    <p>{data.location}</p>
                    <div className="view-profile">
                      <button onClick={(e) => handleViewProfile(e, data.user)}>
                        View Profile
                      </button>
                    </div>
                  </div>
                  <div className="profiles__profile-skills">
                    <h2>Skills</h2>
                    {data.skills.map((skill) => {
                      return <p>{skill}</p>;
                    })}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Profiles;
