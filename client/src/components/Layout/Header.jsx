import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logInAuth } from "../redux/actions/auth";
import Alert from "../Layout/Alert";
const Header = () => {
  const [logIn, setLogIn] = useState({
    email: "",
    password: "",
  });
  const error = useSelector((state) => state.auth.msg);
  const auth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  console.log(error);
  const handleLogInForm = (e) => {
    e.preventDefault();
    setLogIn({ ...logIn, [e.target.name]: e.target.value });
  };
  const { email, password } = logIn;
  const handleLogInBtn = (e) => {
    e.preventDefault();
    dispatch(logInAuth({ email, password }));
  };
  if (auth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <div className="header">
        <div className="header__container">
          <div className="header__titleContent">
            <h1 className="heading-primary">C o n e k DEVS</h1>
            <h1 className="heading-sub">connect with your co-devs</h1>
          </div>
          <div className="header__loginForm">
            <Alert alert={error} />
            <div className="header__form">
              <div className="form">
                <form
                  className="form-row"
                  action="submit"
                  onSubmit={(e) => handleLogInBtn(e)}
                >
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={logIn.email}
                    onChange={(e) => handleLogInForm(e)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={logIn.password}
                    onChange={(e) => handleLogInForm(e)}
                    required
                  />
                  <button>Log In</button>
                </form>
                <button
                  className="create"
                  style={{ backgroundColor: "#30475e" }}
                >
                  <Link
                    to="/register"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Create an account
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
