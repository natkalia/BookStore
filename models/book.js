const mongoose = require('mongoose');
const Joi = require("joi");

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title should be added"],
        minlength: 2,
        maxlength: 100
    },
    author: {
        type: String,
        required: [true, "Author should be added"],
        minlength: 4,
        maxlength: 200
    },
    description: {
        type: String,
        required: [true, "Description should be added"],
        minlength: 10,
        maxlength: 1000
    },
    category: {
        type: String,
        required: [true, "Category should be added"],
        enum: [
          "Thriller",
          "Crime fiction",
          "Romance",
          "For kids",
          "Biography",
          "Fantasy",
          "Handbooks",
          "Poetry",
          "Travel",
          "Non-fiction"
        ]
    },
    publishingYear: {
        type: Number,
        max: currentYear,
        min: 1700,
        required: [true, "Publishing year should be added"]
    },
    reviewsList: [{ 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String,
            minlength: 2,
            maxlength: 200
        }, 
        date: {
            type: String
        },
        stars: {
            type: Number,
            min: 0,
            max: 5,
        }
    }]
});

const Book = mongoose.model('Book', bookSchema);

function validateBook(book) {
    const schema = {
        title: Joi.string()
            .required()
            .min(2)
            .max(100),
        author: Joi.string()
            .required()
            .min(4)
            .max(200),
        description: Joi.string()
            .required()
            .min(10)
            .max(1000),
        category: Joi.string()
            .required()
            .valid(
                "Thriller",
                "Crime fiction",
                "Romance",
                "For kids",
                "Biography",
                "Fantasy",
                "Handbooks",
                "Poetry",
                "Travel",
                "Non-fiction"
            ),
        publishingYear: Joi.number()
            .required()
            .integer()
            .max(currentYear)
            .min(1700),
    }
    return Joi.validate(book, schema);
};

function validateComment(book) {
    const schema = {
        comment: Joi.string().max(200).min(2).required(),
        stars: Joi.number().min(0).max(5).integer().required()
    }
    return Joi.validate(book, schema);
}

exports.Book = Book;
exports.validateBook = validateBook;
exports.validateComment = validateComment;