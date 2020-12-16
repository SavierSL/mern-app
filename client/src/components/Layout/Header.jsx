import React from "react";
import { Link } from "react-router-dom";

const header = () => {
  return (
    <>
      <div className="header">
        <div className="header__container">
          <div className="header__titleContent">
            <h1 className="heading-primary">C o n e k</h1>
            <h1 className="heading-sub">connect with your friends</h1>
          </div>
          <div className="header__loginForm">
            <div className="header__form">
              <div className="form">
                <form className="form-row" action="submit">
                  <input type="text" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <button>Log In</button>
                  <button style={{ backgroundColor: "#30475e" }}>
                    <Link
                      to="/register"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Create an account
                    </Link>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default header;
