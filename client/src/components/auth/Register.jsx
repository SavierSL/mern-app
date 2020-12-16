import React, { useState, useEffect } from "react";
import { setAlert, removeAlert } from "../redux/actions/alert";
import { registerAuth } from "../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";
const Register = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const auth = useSelector((state) => state.auth);
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
  const handRegisterBtn = (e) => {
    console.log("Password");
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
            <form
              className="form-row"
              action="submit"
              onSubmit={(e) => handRegisterBtn(e)}
            >
              <input
                type="text"
                name="name"
                placeholder="Email"
                value={name}
                onChange={(e) => handleForm(e)}
                required
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
