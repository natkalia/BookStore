const express = require('express');
const router = express.Router();
const { Book, validateBook, validateComment } = require('../models/book');
const mongoose = require('mongoose');

//Book view 
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send('The book with the given ID was not found');

  let sum = 0;
  for (let rating of book.reviewsList) {
    sum += rating.stars;
  }
  const calculation = (sum / book.reviewsList.length).toFixed(2);
  const averageStars = isNaN(calculation) ? 'Waiting for your comment' : calculation;

  res.render('bookView', {
    book: book,
    averageStars: averageStars
  });
});

//Delete book
router.delete('/:id', async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);

  if (!book) return res.status(404).send('The book with the given ID was not found');

  res.send('Success');
})

module.exports = router;
