const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
//Validator
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

//@route     GET api/auth
//@desc      Test route
//@access    Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    if (!user) {
      res.status(401).send("Invalid Token");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
  res.send("Auth route");
});

// TOMORROW LET"S CHECK IF THE OBJECTID OF THE PROFILEMODEL IS SAME IN THE USERMODEL
router.post(
  "/login",
  //validation log in
  [
    check("email", "Please Include a valid email").isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      //See if the user exist in the db
      let user = await User.findOne({ email }); //will return the data
      if (!user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Email does not Exist" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //Return the jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      //Token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.send({ token });
        }
      ); //second param is the secret token
    } catch (e) {
      res.status(500).send(e.message);
      console.log(e);
    }
  }
);

module.exports = router;
