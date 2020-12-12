const express = require("express");
const router = express.Router(); // remember this Xavier
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
//Validator
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

//@route     POST api/users
//@desc      Register User
//@access    Public
router.post(
  "/",
  //validation
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please Include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      //See if the user exist in the db
      let user = await User.findOne({ email }); //will return the data
      if (user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Email Already Exist" }] });
      }

      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", // size
        r: "pg", // rating to pg so no naked people
        d: "mm", // there is a default if no image
      });
      user = new User({
        // it is not yet save in the database
        name,
        email,
        avatar,
        password,
      });

      //Encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

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
