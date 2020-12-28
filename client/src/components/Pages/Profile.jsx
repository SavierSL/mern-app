import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { viewProfile } from "../redux/actions/profile";

const Profile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileByID.profileIDData);
  console.log(profileData);

  return (
    <>
      <div className="profile">
        <h1 className="heading-primary">Profile</h1>
        <div className="profile__container">
          <div className="profile__container-pic">
            <img src={profileData.user.avatar} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
