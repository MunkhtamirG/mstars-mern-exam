const booksService = require("./books.service");

const createBook = async (req, res) => {
  try {
    const book = await booksService.createBook(req);
    res.json({
      data: book,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await booksService.deleteBook(req);
    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.json({
      success: false,
      data: error,
    });
  }
};

const updateBook = async (req, res) => {
  const book = await booksService.updateBook(req);
  res.json({
    data: book,
  });
};

const getAllBooks = async (req, res) => {
  const book = await booksService.getAllBooks(req);
  res.json({
    data: book,
  });
};

const getBookById = async (req, res) => {
  const book = await booksService.getBookById(req);
  res.json({
    data: book,
  });
};

module.exports = {
  createBook,
  deleteBook,
  updateBook,
  getAllBooks,
  getBookById,
};
