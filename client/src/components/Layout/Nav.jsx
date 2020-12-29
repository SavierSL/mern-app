import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions/dashboard";

const Nav = () => {
  const dispatch = useDispatch();
  const handleLogOutBtn = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };
  return (
    <>
      <div className="navigator">
        <h2 className="navigator__profiles">
          {" "}
          <Link to="/profiles">Developers</Link>{" "}
        </h2>
        <h2 className="navigator__profiles">
          {" "}
          <Link to="/dashboard">Dashboard</Link>{" "}
        </h2>
        <h2 className="navigator__post">
          {" "}
          <Link to="/post">Posts</Link>{" "}
        </h2>
        <h2 className="navigator__logout" onClick={(e) => handleLogOutBtn(e)}>
          <Link to="/">Log out</Link>{" "}
        </h2>
      </div>
    </>
  );
};

export default Nav;
