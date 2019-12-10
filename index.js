require('dotenv').config();
const basicDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const morgan = require('morgan');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connectionString = `mongodb+srv://${config.get('db.user')}:${config.get('db.password')}@${config.get('db.address')}/${config.get('db.name')}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => dbDebug('Connected to MongoDB...'))
  .catch((err) => {
    dbDebug('Could not connect to MongoDB.', err.message);
  });

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  basicDebug('Morgan enabled...')
}

/* app.use('/api/books', books);
app.use('/api/users', users); */

app.get('/', (req, res) => {
  res.render('main');
});

const port = process.env.PORT || 3000;
app.listen(port, () => basicDebug(`Listening on port ${port}...`));
