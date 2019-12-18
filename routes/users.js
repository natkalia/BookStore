const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const {
    User,
    validate
} = require("../models/user");
const {
    checkNotAuthenticated
} = require("../middleware/auth");

router.get('/',
// checkNotAuthenticated, 
(req, res) => {
  res.render('registration');
})

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
})

// Register new user
router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    })
    if (user) return res.status(400).send('User already registered');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    await user.save();

  // const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
  const token = user.generateAuthToken();
  console.log('token from user creation:', token);

  res.cookie('token', token);
  res.redirect('/');
});

module.exports = router;