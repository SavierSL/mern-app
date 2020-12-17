import React from "react";

const Alert = ({ alert }) => {
  let alertMsg = "";
  if (alert.length !== 0) {
    alertMsg = (
      <div className="alert">
        {alert.map((msg) => {
          return <h2 className="alet__msg">{msg.msg}</h2>;
        })}
      </div>
    );
  } else {
    alertMsg = "";
  }
  return <>{alertMsg}</>;
};

export default Alert;
