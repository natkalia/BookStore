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
  checkNotAuthenticated, 
(req, res) => {
  res.render('registration');
})

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
})

router.get('/:id', async (req, res) => {
  const userData = await User.findById(req.params.id);
  console.log(userData);
  const user = userData;
  const { name, email, isEditor } = userData;
  res.render("userProfile", {
    user: user,
    name: name,
    email: email,
    isEditor: isEditor
  });
})

// Register new user
router.post('/', async (req, res) => {
  const {
      error
  } = validate(req.body);

  let user = await User.findOne({
      email: req.body.email
  });

  if (error) {
    req.flash('danger', `${error.details[0].message}`);
    return res.status(400).redirect('/api/users');
  } else if (user) {
    req.flash('danger', 'User already registered');
    return res.status(400).redirect('/api/users');
  } else {
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
  }
});

module.exports = router;