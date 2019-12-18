const express = require('express');
const router = express.Router();
const { Book } = require('../models/book');
const { checkAuthenticated } = require('../middleware/auth');

//Top10 books
router.get('/', checkAuthenticated, async (req, res) => {
  const books = await Book.find();
  if (!books) return res.status(404).send('There are no books found');

  let top10books = [];
  let sortedBooks= [];
  for (book of books) {
    if (book.reviewsList.length !== 0){
      let starsTotalAmount = 0;
      for (review of book.reviewsList) {
        starsTotalAmount += review.stars;
      }
      const avarageNote = (starsTotalAmount / book.reviewsList.length).toFixed(2);
      sortedBooks.push({book, avarageNote})
    }
  }

  sortedBooks.sort((a, b) => b.avarageNote - a.avarageNote);
  top10books = sortedBooks.slice(0, 11);

  console.log('name from middleware', res.locals.name);
  console.log('editor from middleware', res.locals.isEditor);
  const { name, isEditor, user } = res.locals;

  res.render('main', {
    name: name, isEditor: isEditor, user: user, top10books: top10books
  });
});


module.exports = router;