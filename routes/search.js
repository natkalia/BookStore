const express = require("express");
const router = express.Router();
const { Book } = require("../models/book");

// Search Engine Books

router.post("/", async (req, res) => {
  const { term } = req.body;
  const regex = new RegExp(`${term}`, 'gi')
 
  const numberOfBooks = await Book.countDocuments({
    $or: [
      {
        author: regex
      },
      {
        title: regex
      }
    ]
  });

  const books = await Book.find({
    $or: [
      {
        author: regex
      },
      {
        title: regex
      }
    ]});

  if (!books) return res.status(404).send("There are no books found");

  res.render("search", {
    numberOfBooks: numberOfBooks,
    books: books
  });
});

module.exports = router;
