const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/readingRoom')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
/* app.use('/api/books', books);
app.use('/api/users', users); */

app.get('/', (req, res) => {
  res.render('main');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
