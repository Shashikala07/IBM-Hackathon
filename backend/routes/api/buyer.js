const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
//Load Applicant Profile
const Profile = require("../../models/Buyer");
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "email"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for the user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

//Create user profile POST
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const buyerFields = {};
    buyerFields.user = req.user.id;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: buyerFields },
          { new: true, strict: false }
        ).then((profile) => res.json(profile));
      } else {
        new Profile(buyerFields).save().then((profile) => res.json(profile));
      }
    });
  }
);

module.exports = router;
