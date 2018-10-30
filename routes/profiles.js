const express = require("express");
const router = express.Router();
const authorization = require('../middleware/authorization');
const asynchMiddleware = require('../middleware/asynchMiddleware');
const { Profile } = require('../models/Profile');
const _ = require('lodash');
const { profileValidation, createProfileData } = require('../validation/profile');


//@route   GET api/profiles/test
//@desc    Tests kardan functionality in route
//@access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Profiels test page works!"
  });
});//END TEST ROUTE


//@route   GET api/profiles/me
//@desc    Get login user profile information
//@access  Private route
router.get('/me', authorization, asynchMiddleware(async (req, res) => {
  const userProfile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']); //profile useri ro ke id oon dakhel token miarim
  if (!userProfile) return res.status(404).json({ errorMessage: "پروفایلی شما ثبت نشده است، لطفا از طریق لینک پروفایل خود را تکمیل کنید" });

  res.json(userProfile);
}));//END MY PROFILE


//@route   GET api/profiles/handle/:handle
//@desc    Get a user profile by handle
//@access  Public route - harkasi mitoone profile ye developer digar ro bebine
router.get('/handle/:handle', asynchMiddleware(async (req, res) => {
  const handle = req.params.handle.trim();
  if (!handle) return res.status(400).json({ errorMessage: "هندل نمیتواند خالی باشد" });

  //find Profile
  const foundProfile = await Profile.findOne({ handle }).populate('user', ['name', 'avatar']);
  if (!foundProfile) return res.status(404).json({ errorMessage: "دولوپری با این مشخصات یافت نشد" });

  res.json(foundProfile);
}));//END users profile



//@route   GET api/profiles/all
//@desc    Get all profiles
//@access  Public route
router.get('/all', asynchMiddleware(async (req, res) => {
  /**TODO: PAGINATION */
  const profiles = await Profile.find().sort({ name: 1 }).populate('user', ['name', 'avatar']);
  if (!profiles) return res.status(404).json({ errorMessage: "دولوپری موجود نیست" })
  res.json(profiles);
}));//END all profile



/**TODO get by id????? */



/* CREATE PROFILE*/
//@route   POST api/profiles/me
//@desc    Create a profile
//@access  Private route
router.post('/me', authorization, asynchMiddleware(async (req, res) => {

  const input = _.pick(req.body, ['handle', 'company', 'location', 'jobStatus', 'skills', 'bio', 'github', 'youtube', 'facebook', 'instagram', 'twitter', 'linkedin']);
  input.user = req.user.id;

  //input validation
  const { errors, isValid } = profileValidation(input);
  if (!isValid) return res.status(400).json({ errorMessage: errors }); //valisation failed

  //check if this handle exist
  if (await Profile.findOne({ handle: input.handle })) return res.status(400).json({ errorMessage: "در حال حاضر چنین هندلی وجود دارد." });

  //create new profile data 
  const newProfileData = createProfileData(input);
  const newProfile = await new Profile(newProfileData);

  //save in database 
  await newProfile.save();

  //send response
  res.json(newProfile);

}));//END CREATE PROFILE


/* UPDATE */
//@route   PUT api/profiles/me
//@desc    Update a profile
//@access  Private route
router.put('/me', authorization, asynchMiddleware(async (req, res) => {
  const input = _.pick(req.body, ['handle', 'company', 'location', 'jobStatus', 'skills', 'bio', 'github', 'youtube', 'facebook', 'instagram', 'twitter', 'linkedin']);
  input.user = req.user.id;

  //input validation
  const { errors, isValid } = profileValidation(input);
  if (!isValid) return res.status(400).json({ errorMessage: errors }); //valisation failed

  //create edited profile data
  const editedData = createProfileData(input)

  //save in database 
  const userProfile = await Profile.findOne({ user: req.user.id });
  if (!userProfile) {
    return res.status(404).json({
      errorMessage: {
        message: 'پروفایلی یافت نشد'
      }
    });
  }

  //update the profile
  const editedProfile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: editedData }, { new: true })

  //send response
  res.json(editedProfile);

}));//END UPDATE PROFILE


/* DELETE */
//@route   POST api/profiles/me
//@desc    delete owned profile
//@access  Private route
router.delete('/me', authorization, asynchMiddleware(async (req, res) => {
  const userId = req.user.id;
  const deletedProfile = await Profile.findByIdAndDelete(userId);
  if (!deletedProfile) res.status(404).json({ errorMessage: 'پروفایلی برای پاک کردن وجود ندارد' });

  res.json(deletedProfile);
}));


module.exports = router;
