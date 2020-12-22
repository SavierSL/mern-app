import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  setAlert,
  removeAlert,
  removeEmailAlert,
} from "../redux/actions/alert";
import { registerAuth } from "../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../Layout/Alert";

const Register = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const auth = useSelector((state) => state.auth.msg);
  console.log(alert);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const handleForm = (e) => {
    e.preventDefault();

    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleFocus = () => {
    console.log("focus");
    dispatch(removeEmailAlert());
  };
  console.log(register);
  const { name, email, password, conPassword } = register;
  useEffect(() => {
    if (password !== conPassword) {
      dispatch(setAlert("Password don't match", "danger"));
    } else {
      dispatch(removeAlert());
      console.log("Password match");
    }
  }, [password, conPassword]);
  if (isAuth === true) {
    return <Redirect to="/dashboard" />;
  }
  const handRegisterBtn = (e) => {
    e.preventDefault();
    if (password !== conPassword) {
      dispatch(setAlert("Password don't match", "danger"));
    } else {
      dispatch(removeAlert());
      dispatch(registerAuth({ name, email, password }));
    }
  };

  return (
    <>
      <div className="register">
        <div className="register__container">
          <h1 className="heading-primary">Register</h1>

          <div className="register__form">
            <Alert alert={alert} />
            <Alert alert={auth} />
            <form
              className="form-row"
              action="submit"
              onSubmit={(e) => handRegisterBtn(e)}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => handleForm(e)}
                required
                onClick={() => handleFocus()}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleForm(e)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleForm(e)}
                required
              />
              <input
                type="password"
                name="conPassword"
                placeholder="Confirm Password"
                value={conPassword}
                onChange={(e) => handleForm(e)}
                required
              />
              <button>Register</button>
            </form>
            <span className="span-link">Already have an account?</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
