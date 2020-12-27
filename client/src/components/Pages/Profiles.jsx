import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfiles } from "../redux/actions/profile";

const Profiles = () => {
  const dispatch = useDispatch();
  const allProfiles = useSelector((state) => state.profile.allProfile);
  useEffect(() => {
    dispatch(getAllProfiles());
  }, []);
  console.log(allProfiles);
  return (
    <>
      <div className="profiles">
        {" "}
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
                    <button>View Profile</button>
                  </div>
                  <div className="profiles__profile-skills">
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
