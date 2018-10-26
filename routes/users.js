const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User, userValidation } = require("../models/User");
const bcrypt = require("bcrypt");
const _ = require('lodash');
const asynchMiddleware = require('../middleware/asynchMiddleware');

//@route   GET api/users/test
//@desc    Tests kardan functionality route marboot be api users
//@access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "صفحه تست یوزر کار میکنه! ایول!"
  });
});

//@route   POST api/users/register
//@desc    Register a new User
//@access  Public route
router.post("/register", asynchMiddleware(async (req, res) => {
  //validate user input
  const { error } = userValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({
        errorMessage: {
          message: `wrong user information format: ${error.details[0].message}`,
          type: "validation error",
          info: "کاربر اطلاعات ضروری رو نفرستاده و یا با فرمت غلط فرستاده"
        }
      });

  //check email existance
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({
    errorMessage: {
      message: 'User already exists',
      type: "duplicate user registeration",
      info: "ایمیلی که کاربر میخواد باهاش ثبت نام کنه قبلا ثبت شده"
    }
  });

  //hash password - felan az bcrypt estefade karam - badan az bcryptjs estefade konam //TO-DO***
  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //TODO - عکس کاربر رو هندل کنم**********

  //create a new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    avatar: 'temp_template'
  });

  //save in database
  await newUser.save();

  //send response
  res.send(_.pick(newUser, ['_id', 'name', 'email']));
}));


//@route   POST api/users/register/googleAuth
//@desc    Register a new User
//@access  Public
router.post("/register/googleAuth");


//@route   GET api/users/register/googleAuth/callback
//@desc    user profile Comming back from Goolge
//@access  Public
router.get("/register/googleAuth/callback", passport.authenticate("google"));


module.exports = router;
