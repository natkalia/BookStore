const express = require('express');
const router = express.Router();
const { Book, validateBook, validateComment } = require('../models/book');
const { checkAuthenticated } = require('../middleware/auth');

// Book add form
router.get('/add', checkAuthenticated, async (req, res) => {

  const { name, isEditor, user } = res.locals;
  console.log('name from middleware', res.locals.name);
  console.log('editor from middleware', res.locals.isEditor);

  if (!isEditor) return res.status(401).send('Only editor can do that!');

  res.render('addBookForm', {
    name: name,
    isEditor: isEditor, 
    user: user
  });
});

// Add book
router.post('/add', async (req, res) => {

  const { error } = validateBook(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishingYear: req.body.publishingYear,
    category: req.body.category,
    description: req.body.description
  });
  await book.save();

  res.redirect('/api/books');
});

// Books list
router.get('/', checkAuthenticated, async (req, res) => {
  const books = await Book.find().sort('title');

  console.log('name from middleware', res.locals.name);
  console.log('editor from middleware', res.locals.isEditor);
  const { name, isEditor, user } = res.locals;

  res.render('booksList', {
    books: books,
    name: name,
    isEditor: isEditor, 
    user: user
  });
});

//Book view
router.get('/:id', checkAuthenticated, async (req, res) => {
  const book = await Book.findOne({
    _id: req.params.id
  }).populate('reviewsList.user', 'name-_id')

  if (!book) return res.status(404).send('The book with the given ID was not found');

  let sum = 0;
  for (let rating of book.reviewsList) {
    sum += rating.stars;
  }
  const calculation = (sum / book.reviewsList.length).toFixed(2);
  const averageStars = isNaN(calculation) ? 'Waiting for your comment' : calculation;

  const { name, isEditor, user } = res.locals;

  res.render('bookView', {
    book: book,
    averageStars: averageStars,
    name: name,
    isEditor: isEditor, 
    user: user
  });
});

//Delete book
router.delete('/:id', checkAuthenticated, async (req, res) => {

  const { isEditor } = res.locals;
  if (!isEditor) return res.status(401).send('Only editor can do that!');
    
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) return res.status(404).send('The book with the given ID was not found'); 

  res.send('Success. You delete the book.');
})

//Edit book form
router.get('/edit/:id', checkAuthenticated, async (req, res) => {
 
  const { isEditor } = res.locals;
  if (!isEditor) return res.status(401).send('Only editor can do that!');

  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).send('The book with the given ID was not found');

  res.render('editBookForm', {
    book: book
  });
});

// Edit book
router.post('/edit/:id', checkAuthenticated, async (req, res) => {

  const { isEditor } = res.locals;
  if (!isEditor) return res.status(401).send('Only editor can do that!');

  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = await Book.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      author: req.body.author,
      publishingYear: req.body.publishingYear,
      category: req.body.category,
      description: req.body.description
    }
  );
  if (!book) return res.status(404).send('The book with the given ID was not found');

  res.redirect('/api/books/'+ book._id);
});

// Add comment and ratings
router.post('/:id', checkAuthenticated, async (req, res) => {

  const { user } = res.locals;
  if (!user) return res.status(401).send('Only logged in users can do that!');

  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send('The book with the given ID was not found');

  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  book.reviewsList.unshift({
    comment: req.body.comment,
    stars: req.body.stars,
    date: `${dateNow} ${timeNow}`,
    user: user._id
  });

  await book.save();

  res.redirect('/api/books/'+ book._id);
});

module.exports = router;
