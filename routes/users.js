const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    res.render('AddUser');
  });

router.get('/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.name));
    if(!user) res.status(404).send('User not found')// 404
    res.send(user);
 });

 module.exports = router;