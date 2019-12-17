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

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('registration');
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

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send();
})

module.exports = router;