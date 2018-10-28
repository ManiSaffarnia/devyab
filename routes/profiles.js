const express = require("express");
const router = express.Router();
const authorization = require('../middleware/authorization');
const asynchMiddleware = require('../middleware/asynchMiddleware');
const { Profile } = require('../models/Profile');
const { User, userValidation, loginValidation } = require("../models/User");

//@route   GET api/profiles/test
//@desc    Tests kardan functionality in route
//@access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Profiels test page works!"
  });
});

//@route   GET api/profiles/me
//@desc    Get login user profile information
//@access  Private route
router.get('/me', authorization, asynchMiddleware(async (req, res) => {
  const userProfile = await Profile.findOne({ user: req.user.id }); //profile useri ro ke id oon dakhel token miarim
  if (!userProfile) return res.status(404).json({ errorMessage: "پروفایلی شما ثبت نشده است، لطفا از طریق لینک پروفایل خود را تکمیل کنید" });

  res.json(userProfile);
}));

/* CREATE */
//@route   POST api/profiles/me
//@desc    Create a profile
//@access  Private route
router.post('/me', authorization, asynchMiddleware(async (req, res) => {
  //input validation


}));

/* UPDATE */
//@route   PUT api/profiles/me
//@desc    Update profile
//@access  Private route
router.put('/me', authorization, asynchMiddleware(async (req, res) => {
  //input validation


}));

/* DELETE */
//@route   POST api/profiles/me
//@desc    delete profile
//@access  Private route
router.delete('/me', authorization, asynchMiddleware(async (req, res) => {
  //input validation


}));


module.exports = router;
