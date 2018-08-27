const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User, userValidation } = require("../models/User");
const bcrypt = require("bcrypt");

//@route   GET api/users/test
//@desc    Tests kardan functionality in route
//@access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "User test page works!"
  });
});

//@route   POST api/users/register
//@desc    Register a new User
//@access  Public
router.post("/register", async (req, res) => {
  //validate user input
  const { error } = userValidation(req.body);
  if (error)
    return res
      .status(400)
      .send(`wrong user format: ${error.details[0].message}`);

  //check email existance
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  //hash password
  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    avatar: req.body.avatar
  });

  //save in database
  await newUser.save();

  //send response
  res.send(newUser);
});

//@route   POST api/users/register/googleAuth
//@desc    Register a new User
//@access  Public
router.post("/register/googleAuth");

//@route   GET api/users/register/googleAuth/callback
//@desc    user profile Comming back from Goolge
//@access  Public
router.get("/register/googleAuth/callback", passport.authenticate("google"));

module.exports = router;
