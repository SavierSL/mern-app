const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
const profile = require("../../models/Profile");
const ObjectId = require("mongodb").ObjectID; // to turn id to Object ID
const { route } = require("./users");

//@route     GET api/profile/me
//@desc      Get current users profile
//@access    Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]); //pertains to the User model //populate method to add the keys from the User db or model
    if (!profile) {
      res.status(400).send({ msg: "There is no profile for this user" });
    }
    res.send(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/profile
// @desc      Create our users profile
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("skills", "Skills is required").not().isEmpty(),
      check("status", "Status is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors.array() });
    }
    try {
      //try to find the user first if there is already an account

      const profileField = {
        user: req.user.id,
        skills: req.body.skills,
        social: req.body.social,
        ...req.body,
      };
      profileField.skills = req.body.skills
        .split(",")
        .map((skill) => skill.trim());
      profileField.social = { ...req.body.social };

      let profile = await Profile.findOne({ user: req.user.id });
      console.log(profile);
      if (!profile) {
        profile = new Profile(profileField);
        await profile.save();
        return res.send(profile);
      }
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileField },
        { new: true }
      );
      res.send(profile);
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  }
);

// router.post(
//   "/",
//   [
//     auth,
//     [
//       check("status", "Status is required").not().isEmpty(),
//       check("skills", "Skills is required").not().isEmpty(),
//       check("website", "website is required").not().isEmpty(),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send({ errors: errors.array() });
//     }
//     console.log(req);

//     const profileField = {
//       user: req.user.id,
//       ...req.body,
//     };
//     profileField.social = {};
//     profileField.social = { ...req.body.social };
//     if (req.body.skills) {
//       profileField.skills = req.body.skills
//         .split(",")
//         .map((skill) => skill.trim());
//     }

//     try {
//       //every time we use mongoose always remember to await
//       let profile = await Profile.findOne({ user: req.user.id });
//       if (profile) {
//         // Update
//         profile = await Profile.findOneAndUpdate(
//           //It will automatically update in DB
//           {
//             user: req.user.id,
//           },
//           { $set: profileField },
//           { new: true } // to return or res.send() the updated data
//         );
//         return res.send(profile);
//       }
//       //Create if there is no profile
//       profile = new Profile(profileField); //it will add it to the db
//       await profile.save();
//       res.send(profile);
//     } catch (e) {
//       console.error(e);
//     }
//   }
// );

module.exports = router;

// router.post(
//   "/",
//   [
//     auth,
//     [
//       check("status", "Status is required").not().isEmpty(),
//       check("skills", "Skills is required").not().isEmpty(),
//       check("website", "website is required").not().isEmpty(),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send({ errors: errors.array() });
//     }
//     console.log(req);

//     const profileField = {
//       user: req.user.id,
//       ...req.body,
//     };
//     profileField.social = {};
//     profileField.social = { ...req.body.social };
//     if (req.body.skills) {
//       profileField.skills = req.body.skills
//         .split(",")
//         .map((skill) => skill.trim());
//     }

//     try {
//       //every time we use mongoose always remember to await
//       let profile = await Profile.findOne({ user: req.user.id });
//       if (profile) {
//         // Update
//         profile = await Profile.findOneAndUpdate(
//           //It will automatically update in DB
//           {
//             user: req.user.id,
//           },
//           { $set: profileField },
//           { new: true } // to return or res.send() the updated data
//         );
//         return res.send(profile);
//       }
//       //Create if there is no profile
//       profile = new Profile(profileField); //it will add it to the db
//       await profile.save();
//       res.send(profile);
//     } catch (e) {
//       console.error(e);
//     }
//   }
// );
