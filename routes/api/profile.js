const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
const profile = require("../../models/Profile");
const ObjectId = require("mongodb").ObjectID; // to turn id to Object ID
const { route } = require("./users");
const { findOne } = require("../../models/Profile");
const request = require("request");
const config = require("config");
const axios = require("axios");

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

      let profileField = {
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
// @route     GET api/profile
// @desc      GET all profiles
// @access    Public
router.get("/", async (req, res) => {
  try {
    const findProfile = await Profile.find().populate("user", [
      "name",
      "avatar",
    ]); //it will find the correct name and avatar base on the user.id
    if (!findProfile) {
      return res.status(400).send("There is no user profile");
    }
    res.send(findProfile);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// @route     DELETE api/profile
// @desc      GET profile by id
// @access    Public
router.get("/user/:user_id", async (req, res) => {
  const id = req.params.user_id;
  try {
    const findProfile = await Profile.findOne({ user: id }).populate("user", [
      "name",
      "avatar",
    ]); //it will find the correct name and avatar base on the user.id
    console.log(findProfile.user);
    if (!findProfile) {
      return res.status(400).send("Profile not found");
    }
    res.send(findProfile);
  } catch (e) {
    if (e.kind === "ObjectId") {
      //base on the params id
      return res.status(400).send("Profile not found");
    }
    res.status(500).send({ error: e.message });
  }
});

// @route     DELETE api/profile
// @desc      DELETE profile by auth
// @access    Public
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.send("Profile and User deleted");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// @route     ADD api/profile/experience
// @desc      ADD experience by experience id
// @access    Public
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Job Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).send("Cannot find the profile user");
      }
      profile.experience.unshift(req.body);
      const experienceAdded = new Profile(profile);
      await experienceAdded.save();
      res.send(profile);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
);

// @route     DELETE api/profile/experience
// @desc      DELETE experience by experience id
// @access    Public
//5fd4ac6b26fb161308826730 to delete

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    let profileToDeleteExp = await Profile.findOne({ user: req.user.id });
    const newExperience = await profileToDeleteExp.experience.filter(
      (experience) => {
        return experience.id != req.params.exp_id;
      }
    );

    if (newExperience.length === profileToDeleteExp.experience.length) {
      return res
        .status(400)
        .send("There is no experience that has been deleted");
    }
    profileToDeleteExp.experience = newExperience;
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileToDeleteExp },
      { new: true }
    );
    res.send(profile);
  } catch (error) {
    res.status(400).send(error.message);
  }
}); /// OOOORRRR but not a good algo

// router.delete("/experience/:exp_id", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });
//     // get and remove index
//     const removeIndex = profile.experience
//       .map((item) => item.id)
//       .indexOf(req.params.exp_id);

//     profile.experience.splice(removeIndex, 1);
//     res.send("deleted");
//     await profile.save();
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

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

// @route     ADD api/profile/education
// @desc      ADD education by education id
// @access    Public
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      // find the profile first with the same user id
      const profile = await Profile.findOne({ user: req.user.id }); // to get the full data
      //if there is no user
      if (!profile) {
        return res.status(400).send("Cannot find the profile user");
      }
      // push the content from the req.body
      profile.education.unshift(req.body);
      //get the blueprint from the new Profile and pass the profile
      const educationAdded = new Profile(profile);
      // save the updated profile
      await educationAdded.save();
      res.send(profile);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
);

// @route     DELETE api/profile/education/:ed_id
// @desc      DELETE education by education id
// @access    Public
router.delete("/education/:ed_id", auth, async (req, res) => {
  try {
    //find the the profile first
    let profileToDeleteEd = await Profile.findOne({ user: req.user.id });
    //filter it and return the unequal education id
    const newEd = await profileToDeleteEd.education.filter((education) => {
      return education.id != req.params.ed_id;
    });
    //if it has the same length then there is nothing to delete
    if (newEd.length === profileToDeleteEd.education.length) {
      return res
        .status(400)
        .send("There is no education that has been deleted");
    }
    //then assign the new value to the profile
    profileToDeleteEd.education = newEd;
    //find the profile again and update it
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileToDeleteEd },
      { new: true }
    );
    //send deleted
    res.send(profile);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// @route     GET api/profile/github/:username
// @desc      Get user repos from github
// @access    Public
router.get("/github/:username", async (req, res) => {
  try {
    //url
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    //headers
    const headers = {
      "user-agent": "node.js",
      Authorization: `token ${config.get("githubToken")}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "No Github profile found" });
  }
});

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
