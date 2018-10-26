const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

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
  return jwt.sign({ id: this.id, name: this.name }, keys.jwt_secret, { expiresIn: "7d" }); //bad 7 rooz expire beshe
};

//user validation - Optional
const userValidation = user => {
  const joiSchema = {
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(80)
      .required(),
    email: Joi.string()
      .max(255)
      .email({ minDomainAtoms: 2 }),
    password: Joi.string()
      .min(8)
      .max(25)
      .regex(/^[a-zA-Z0-9]{3,30}$/),
    avatar: Joi.string()
  };
  return Joi.validate(user, joiSchema);
};

const loginValidation = (input) => {
  const loginSchema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).min(1).required(),
    password: Joi.string().min(1).required()
  }

  return Joi.validate(input, loginSchema);
}


//user model
const User = mongoose.model("user", userSchema);

module.exports = {
  userSchema,
  User,
  userValidation,
  loginValidation
};
