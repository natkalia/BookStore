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
        type: [{
          type: String,
          required: [true, "Author should be added"],
          min: 4,
          max: 50
      }]
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
        required: [true, "Publishing year should be added"]
    },
    reviewsList: [{ 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        body: {
            type: String,
            maxlength: 200
        }, 
        date: {
            type: Date,
            default: Date.now
        },
        stars: {
            type: Number,
            min: 0,
            max: 5,
            validate: {
                validator: Number.isInteger,
                message: "Stars amount has to be integer"
            }
        }
    }]
});

const Book = mongoose.model('Book', bookSchema);

function validateBook(book) {
    const schema = {
        title: Joi.string
            .required()
            .min(2)
            .max(100),
        author: Joi.array().items(Joi.string()
            .required()
            .min(4)
            .max(50)
            ),
        category: Joi.string
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
        publishingYear: Joi.Number
            .required()
            .integer()
            .min(0)
            .max(5),
        reviewsList: Joi.array().items(
            Joi.object({
                user: Joi.string(),
                body: Joi.string().max(200),
                date: Joi.date(),
                stars: Joi.Number.validate(1, 2, 3, 4, 5)
            })
        )    
    }
    return Joi.validate(book, schema);
};

exports.Book = Book;
exports.validate = validateBook;
