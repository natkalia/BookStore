const mongoose = require('mongoose');
const Joi = require("joi");


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title should be added"],
        min: 2,
        max: 100
    },
    author: {
        type: String,
        required: [true, "Author should be added"],
        min: 4,
        max: 50
    },
    category: {
        type: String,
        required: [true, "Category should be added"],
        enum: [
            "Dramat",
            "Thriller",
            "Kryminał",
            "Romans",
            "Dla dzieci",
            "Biografia",
            "Fantastyka",
            "Poradnik",
            "Literatura piękna",
            "Literatura podróżnicza",
            "Literatura faktu, reportaż",
            "Literatura obyczajowa"
        ]
    },
    publishingYear: {
        type: Number,
        required: [true, "Publishing year should be added"]
    },
    reviewsList: [{ 
        body: {
            type: String,
            maxlength: 200
        }, 
        date: {
            type: Date,
            default: Date.now
        }
    }],
    stars: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    }
});

const Book = mongoose.model('Book', bookSchema);

function validateBook(book) {
    const schema = {
        title: Joi.string
            .required()
            .min(2)
            .max(100),
        author: Joi.string
            .required()
            .min(4)
            .max(50),
        category: Joi.string
            .required()
            .valid(
                "Dramat",
                "Thriller",
                "Kryminał",
                "Romans",
                "Dla dzieci",
                "Biografia",
                "Fantastyka",
                "Poradnik",
                "Literatura piękna",
                "Literatura podróżnicza",
                "Literatura faktu, reportaż",
                "Literatura obyczajowa"
            ),
        publishingYear: Joi.Number
            .required()
            .integer(),
        reviewsList: Joi.array().items(
            Joi.object({
                body: Joi.string().max(200),
                date: Joi.date()
            })
          ),
        stars: Joi.Number
            .validate(1, 2, 3, 4, 5)
    }
    return Joi.validate(book, schema);
};

exports.Book = Book;
exports.validate = validateBook;