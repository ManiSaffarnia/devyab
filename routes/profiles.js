const express = require("express");
const router = express.Router();
const _ = require('lodash');
const obejectID = require('mongoose').Types.ObjectId;
const authorization = require('../middleware/authorization');
const asynchMiddleware = require('../middleware/asynchMiddleware');
const { Profile } = require('../models/Profile');
const { profileValidation, createProfileData } = require('../validation/profile');
const experienceValidation = require('../validation/experience');
const educationValidation = require('../validation/education');


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
  if (!userProfile) return res.status(404).json({ errorMessage: "پروفایلی شما ثبت نشده است، لطفا از طریق لینک پروفایل خود را تکمیل کنید", noProfile: true });

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
  let pageNumber, pageSize;
  try {
    pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;
    pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  } catch (ex) {
    req.status(400).send('اعداد غلطه')
  }

  //
  const profiles = await Profile.find().sort({ name: 1 }).skip((pageNumber - 1) * pageSize).limit(pageSize).populate('user', ['name', 'avatar']);
  if (!profiles) return res.status(404).json({ errorMessage: "دولوپری موجود نیست" })
  res.json(profiles);
}));//END all profile



/**TODO get by id????? */



/* CREATE PROFILE*/
//@route   POST api/profiles/me
//@desc    Create a profile
//@access  Private route
router.post('/me', authorization, asynchMiddleware(async (req, res) => {

  const input = _.pick(req.body, ['handle', 'company', 'website', 'location', 'jobStatus', 'skills', 'bio', 'github', 'youtube', 'facebook', 'instagram', 'twitter', 'linkedin']);
  input.user = req.user.id;
  //input validation
  const { errors, isValid } = profileValidation(input);
  if (!isValid) return res.status(400).json({ errorMessage: errors }); //valisation failed

  //check if this handle exist
  if (await Profile.findOne({ handle: input.handle })) return res.status(400).json({ errorMessage: "در حال حاضر چنین هندلی وجود دارد." });

  //create new profile data 
  const newProfileData = createProfileData(input);
  console.log(newProfileData);
  const newProfile = await new Profile(newProfileData);
  console.log(newProfile);
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
  console.log(req.body);
  const input = _.pick(req.body, ['handle', 'company', 'location', 'website', 'jobStatus', 'skills', 'bio', 'github', 'youtube', 'facebook', 'instagram', 'twitter', 'linkedin']);
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
//@route   DELETE api/profiles/me
//@desc    delete owned profile
//@access  Private route
router.delete('/me', authorization, asynchMiddleware(async (req, res) => {
  const userId = req.user.id;
  const deletedProfile = await Profile.findOneAndDelete({ user: userId });
  if (!deletedProfile) res.status(404).json({ errorMessage: 'پروفایلی برای پاک کردن وجود ندارد' });

  res.json(deletedProfile);
}));//END DELETE PROFILE


//====================================================================================================
//                                            EXPERIENCE
//====================================================================================================
/* ADD EXPERIENCE*/
//@route   POST api/profiles/experience
//@desc    Add job experience to profile
//@access  Private route
router.post('/experience', authorization, asynchMiddleware(async (req, res) => {

  const input = _.pick(req.body, ['title', 'companyName', 'location', 'startDate', 'endDate', 'current', 'description']);
  input.userID = req.user.id;

  //input validation
  const { errors, isValid } = experienceValidation(input);
  if (!isValid) return res.status(400).json({ errorMessage: errors }); //valisation failed

  const newExperience = {
    title: input.title,
    companyName: input.companyName,
    location: input.location,
    startDate: input.startDate,
    endDate: input.endDate,
    current: input.current,
    description: input.description,
  }

  //find profile for this user
  const userProfile = await Profile.findOne({ user: input.userID });
  if (!userProfile) return res.status(404).json({ errorMessage: "پروفایلی یافت نشد" });

  //push the new experience at the begining of the array
  userProfile.jobExperience.unshift(newExperience);

  //save changes in database 
  await userProfile.save();

  //send response
  res.json(userProfile);

}));//END ADD EXPERIENCE

/**TODO- EDIT EXPERINCE */


/* DELETE EXPERIENCE*/
//@route   DELETE api/profiles/experience/:experienceID
//@desc    Delete a job experience from profile
//@access  Private route
router.delete('/experience/:experienceID', authorization, asynchMiddleware(async (req, res) => {
  //get experience id from params
  const experienceID = req.params.experienceID;
  if (!experienceID || !obejectID.isValid(experienceID)) return res.status(400).json({ errorMessage: 'ایدی مربوط به تحربه کاری ارسال نشده ویا معتبر نمیباشد' });

  //find profile for this user
  const userProfile = await Profile.findOne({ user: req.user.id });
  if (!userProfile) return res.status(404).json({ errorMessage: "پروفایلی یافت نشد" });

  //find index of target experience
  const deleteIndex = userProfile.jobExperience.findIndex((eachExperience) => {
    return eachExperience.id === experienceID
  });

  //delete that experince from experience array
  userProfile.jobExperience.splice(deleteIndex, 1);

  //save changes in database 
  await userProfile.save();

  //send response
  res.json(userProfile);

}));//END DELETE EXPERIENCE



//====================================================================================================
//                                            EDUCATION
//====================================================================================================
/* ADD EDUCATION*/
//@route   POST api/profiles/education
//@desc    Add an education to a profile
//@access  Private route
router.post('/education', authorization, asynchMiddleware(async (req, res) => {

  const input = _.pick(req.body, ['schoolTitle', 'degree', 'fieldOfStudy', 'GPA', 'location', 'startDate', 'endDate', 'current', 'description']);
  input.userID = req.user.id;

  //input validation
  const { errors, isValid } = educationValidation(input);
  if (!isValid) return res.status(400).json({ errorMessage: errors }); //valisation failed

  const newEducation = {
    schoolTitle: input.schoolTitle,
    degree: input.degree,
    fieldOfStudy: input.fieldOfStudy,
    GPA: input.GPA,
    location: input.location,
    startDate: input.startDate,
    endDate: input.endDate,
    current: input.current,
    description: input.description,
  }

  //find profile for this user
  const userProfile = await Profile.findOne({ user: input.userID });
  if (!userProfile) return res.status(404).json({ errorMessage: "پروفایلی یافت نشد" });

  //push the new education record at the begining of the array
  userProfile.education.unshift(newEducation);

  //save changes in database 
  await userProfile.save();

  //send response
  res.json(userProfile);

}));//END ADD EDUCATION



/* DELETE EDUCATION*/
//@route   DELETE api/profiles/education/:educationID
//@desc    Delete an education from profile
//@access  Private route
router.delete('/education/:educationID', authorization, asynchMiddleware(async (req, res) => {
  //get educationID from params
  const educationID = req.params.educationID;
  if (!educationID || !obejectID.isValid(educationID)) return res.status(400).json({ errorMessage: 'ایدی مربوط به سابقه تحصیلی ارسال نشده ویا معتبر نمیباشد' });

  //find profile for this user
  const userProfile = await Profile.findOne({ user: req.user.id });
  if (!userProfile) return res.status(404).json({ errorMessage: "پروفایلی یافت نشد" });

  //find index of target education
  const deleteIndex = userProfile.education.findIndex((eachEducation) => {
    return eachEducation.id === educationID
  });

  //delete that education from education array
  userProfile.education.splice(deleteIndex, 1);

  //save changes in database 
  await userProfile.save();

  //send response
  res.json(userProfile);

}));//END DELETE EDUCATION


module.exports = router;
