import React from "react";

const Alert = ({ alert }) => {
  let alertMsg = "";
  if (alert.length !== 0) {
    alertMsg = (
      <>
        {alert.map((msg) => {
          return (
            <>
              {" "}
              <div style={{ marginTop: "1rem" }} className="alert">
                <h2 className="alert__msg">{msg.msg}</h2>
              </div>
            </>
          );
        })}
      </>
    );
  } else {
    alertMsg = "";
  }
  return <>{alertMsg}</>;
};

export default Alert;
