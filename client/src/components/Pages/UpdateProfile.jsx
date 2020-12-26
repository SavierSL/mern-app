import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileById } from "../redux/actions/profile";

const UpdateProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const profileData = useSelector((state) => state.dashboard.profile);
  const [profile, setProfile] = useState(profileData);

  return (
    <>
      <h1 className="heading-primary">Update Profile</h1>
      <p>{profile.bio}</p>
      <p>{profile.user.name}</p>
      <p>{profile.company}</p>
    </>
  );
};

export default UpdateProfile;
