const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const _ = require('lodash');
const { User } = require("../models/User");
const asynchMiddleware = require('../middleware/asynchMiddleware');
const mail = require('../Mails/verificationMail');
const loginValidation = require('../validation/login');
const registerValidation = require('../validation/register');

//============================================================================================== 
//                                         REGISTER
//==============================================================================================
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
  const { errors, isValid } = registerValidation(req.body);

  if (!isValid) {
    return res.status(400).json({
      errorMessage: errors
    });
  }

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
  let newUser = await new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    avatar: 'temp_template'
  });

  //create token for Email verification
  newUser.token = await jwt.sign({ user: _.pick(newUser, 'id') }, 'mani');

  //save in database
  await newUser.save();

  //send a verification Email
  const url = `http://localhost:3000/api/users/verification/${newUser.token}`;
  await mail(newUser.email, url);

  //send response to client
  res.json(_.pick(newUser, ['_id', 'name', 'email']));

}));//END CREATE USER


//@route   POST api/users/register/googleAuth
//@desc    Register a new User
//@access  Public
router.post("/register/googleAuth");


//@route   GET api/users/register/googleAuth/callback
//@desc    user profile Comming back from Goolge
//@access  Public
router.get("/register/googleAuth/callback", passport.authenticate("google"));


//============================================================================================== 
//                                         LOGIN
//==============================================================================================
//@route   POST api/users/login
//@desc    Login a User and return TOKEN
//@access  Public route
router.post('/login', async (req, res) => {

  if (req.header('x-auth-token')) return res.status(400).send({ errorMessage: "شما یک توکن دارید و نیازی به ایجاد توکن جدید ندارید" });

  //input validation
  const { errors, isValid } = loginValidation(req.body);
  if (!isValid) {
    return res.status(400).json({ errorMessage: errors });
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user in database
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({
        errorMessage: {
          message: `Username OR Password is WRONG!`,
          type: "validation error",
          info: "ایمیل یا پسورد غلط وارد شده و یا همچین کاربری نداریم"
        }
      });

  //compare passwords 
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    //username va password ghalat boode va bayad error bargardoonim
    return res
      .status(400)
      .json({
        errorMessage: {
          message: `Username OR Password is WRONG!`,
          type: "validation error",
          info: "ایمیل یا پسورد غلط وارد شده و یا همچین کاربری نداریم"
        }
      });
  }

  //chech user email verification
  if (!user.isActive) return res
    .status(400)
    .json({
      errorMessage: {
        message: `User not Activated. please check your email`,
        type: "verification error",
        info: "کاربر ایمیل خودش رو تایید نکرده"
      }
    });

  //user dorost boode va bayad barash token dorost beshe 
  //generate token
  const token = user.generateAuthToken();

  //send the response to user
  res.header('x-auth-token', token).json({
    success: true
  })
});//END


//============================================================================================== 
//                                         EMAIL VERIFICATION
//==============================================================================================
//@route   GET api/users/verification/:token
//@desc    verify user email address
//@access  Private
router.get('/verification/:token', async (req, res) => {
  //take token from req.params
  const { token } = req.params;
  if (!token) return res.status(400).send('توکنی ارسال نشده است. توکن نمیتواند خالی باشد');

  try {
    //decode token
    const decodeUser = jwt.verify(token, 'mani');

    //find user by this id
    const user = await User.findById(decodeUser.user.id);

    if (user.token === token) {
      //delete token from db and active user
      const updatedUser = await User.findByIdAndUpdate(user.id, { $set: { token: null, isActive: true } }, { new: true });

      //send response to user
      /*TODO: REDIRECT USER TO LOGIN PAGE */
      res.json({
        msg: 'اکانت شما فعال شد',
        data: updatedUser
      });
    }
    else {
      return res.status(400).send('توکن فرستاده شده با توکن ذخیره شده متفاوت است');
    }
  }
  catch (err) {
    res.status(400).send('توکن فاقد اعتبار');
  }
});//END



module.exports = router;
