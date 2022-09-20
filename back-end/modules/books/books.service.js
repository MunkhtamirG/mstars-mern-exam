const { default: mongoose } = require("mongoose");
const Books = require("./book.model");

const createBook = async (req) => {
  const book = new Books(req.body);
  return book.save();
};

const getAllBooks = (req) => {
  return Books.find();
};

const updateBook = async (req) => {
  const { id } = req.query;
  await Books.findByIdAndUpdate(id, req.body);
  const book = await Books.findById(id);
  return book;
};

const deleteBook = async (req) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const book = await Books.findByIdAndDelete(id);
    return book;
  }
};

const getBookById = async (req) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const book = await Books.findById(id);
    return book;
  }
};

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBookById,
};
