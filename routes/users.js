const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const authorize = require('../middleware/auth');


router.get('/', async (req, res) => {
    res.render('AddUser');
  });

  router.post('/', authorize, async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if (req.userID != null) return res.status(400).send('You are already logged in!');
  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('You are already registered.');
  
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isEditor: req.body.isEditor
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
  
    const token = jwt.sign({ _id: user._id }, 'Key');
    res.cookie('token', token).send({
      _id: user._id,
      name: user.name,
      email: user.email
    });
    await user.save();
  });

router.get('/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.name));
    if(!user) res.status(404).send('User not found')// 404
    res.send(user);
 });

 module.exports = router;