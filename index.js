require('dotenv').config();
const basicDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const morgan = require('morgan');
const config = require('config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const messages = require('express-messages');
const express = require('express');
const mongoose = require('mongoose');
const top10 = require('./routes/top10');
const books = require('./routes/books');
const auth = require('./routes/auth');
const users = require('./routes/users');
const search = require('./routes/search');
const { checkAuthenticated } = require('./middleware/auth');

const app = express();

if (!config.get('db.jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

const connectionString = `mongodb+srv://${config.get('db.user')}:${config.get('db.password')}@${config.get('db.address')}/${config.get('db.name')}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => dbDebug('Connected to MongoDB...'))
  .catch((err) => {
    dbDebug('Could not connect to MongoDB.', err.message);
  });

// Bad Id for user or book (not finished error handling)
process.on('unhandledRejection', error => {
  console.log('unhandledRejection:', error.message);
});

// Errors HTML output with session, flash and messages
app.use(session({
  secret: `${config.get('session_secret')}`,
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = messages(req, res);
  next();
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(cookieParser());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  basicDebug('Morgan enabled...')
}
app.use(express.static('public'));
app.use('/api/books', books);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/search', checkAuthenticated, search);
app.use('/', top10);

// Bad Path render
app.use(function (req, res, next) {
  res.status(404).render('badpath')
});

const port = process.env.PORT || 3000;
app.listen(port, () => basicDebug(`Listening on port ${port}...`));