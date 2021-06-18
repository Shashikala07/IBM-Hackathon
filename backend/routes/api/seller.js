const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validProfileInput = require("../../validation/sellerprofile");
//Load Applicant Profile
const Profile = require("../../models/Seller");
const User = require("../../models/User");
const isEmpty = require("../../validation/is-empty");
const Validator = require("validator");
const { session } = require("passport");
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
    console.log(req.body);
    const { errors, isValid } = validProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const sellerFields = {};
    sellerFields.user = req.user.id;
    sellerFields.contactno = req.body.contactno;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: sellerFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        new Profile(sellerFields).save().then((profile) => res.json(profile));
      }
    });
  }
);

module.exports = router;
