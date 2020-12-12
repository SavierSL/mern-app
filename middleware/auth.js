const jwt = require("jsonwebtoken");
const config = require("config");

//VERIFY THE USER
module.exports = function (req, res, next) {
  // Get the token from the header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).send({ msg: "No token, auth denied" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    console.log(decoded.user);

    next();
  } catch (e) {
    res.status(401).send({ msg: "Token is not valid" });
  }
};
