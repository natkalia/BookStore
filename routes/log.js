const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  if (!('token' in req.cookies)) return res.send('You are not log in.');

  res.clearCookie('token').send('Log out...');
});

module.exports = router;