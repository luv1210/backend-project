const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  authorname: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  bookUrl: {
    type: String,
    default: '',
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
