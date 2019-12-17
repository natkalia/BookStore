const jwt = require('jsonwebtoken');
const config = require('config');

function checkAuthenticated(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided');

  try {
    const decoded = jwt.verify(token, config.get('db.jwtPrivateKey'));
    //This makes the user awailable with every request
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
}

function checkNotAuthenticated(req, res, next) {
  const token = req.header('x-auth-token');
  if (token) {
    return res.redirect('/');
  }
  next();
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated
};