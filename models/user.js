require('dotenv').config();
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const config = require('config');

// Create mongoose schema with basic validation what is saved in database

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field cannot be empty"],
    minlength: [4, "Name is too short"],
    maxlength: [20, "Name is too long"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email field cannot be empty"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Not a valid email address"
    ],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password field cannot be empty"],
    minlength: 8,
    maxlength: 500, // passwords will be stored after hashing so this should be long enough
    trim: true
  },
  isEditor: { type: Boolean, default: "false" } 
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    _id: this._id,
    name: this.name,
    isEditor: this.isEditor
  }, config.get('db.jwtPrivateKey'));
  return token;
}

// Compile schema into model

const User = mongoose.model("User", userSchema);

// Create validate function with joi to be used to validate user input

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(4)
      .max(20)
      .required(),
    email: Joi.string()
      .min(8)
      .max(20)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(24) // checking password length as provided by the user in plain text (before hashing)
      .required()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/) // regex for special/number/capital
  };
  return Joi.validate(user, schema);
}

// Export user model with validate function

exports.User = User;
exports.validate = validateUser;
