const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  book_name: {
    type: String,
  },
  ISBN: {
    type: Number,
    minlength: 10,
    minlength: 10,
    unique: true,
  },
  author: {
    type: String,
  },
  publish_date: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
  },
  publisher: {
    type: String,
    default: "Publisher",
  },
});

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
