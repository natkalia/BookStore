const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Joi = require("joi");
const {
  User
} = require('../models/user');
const {
  checkNotAuthenticated
} = require("../middleware/auth");

function validateUser(user) {
  const schema = {
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

router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('login');
})

router.post('/', async (req, res) => {
  const {
    error
  } = validateUser(req.body);

  let user = await User.findOne({
    email: req.body.email
  });

  if (error) {
    req.flash('danger', `${error.details[0].message}`);
    return res.status(400).redirect('/api/auth');
  } else if (!user) {
    req.flash('danger', 'Invalid email or password');
    return res.status(400).redirect('/api/auth');
  } else {
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');
  
    const token = user.generateAuthToken();
    console.log('token from user creation:', token);
  
    res.cookie('token', token);
    res.redirect('/');
  }
});

module.exports = router;