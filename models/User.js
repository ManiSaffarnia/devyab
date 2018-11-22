const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const config = require('config');

//create User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 80,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255
  },
  avatar: {
    type: String,
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  lastLoginDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    default: null
  }
});


//userSchema Methodes
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this.id, name: this.name }, config.get("JWTsecret"), { expiresIn: "7d" }); //bad 7 rooz expire beshe
};


//user model
const User = mongoose.model("user", userSchema);

module.exports = {
  userSchema,
  User
};
