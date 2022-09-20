const express = require("express");
const router = express.Router();
const booksController = require("../../modules/books/books.controller");

router.post("/", booksController.createBook);
router.get("/", booksController.getAllBooks);
router.put("/", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);
router.get("/:id", booksController.getBookById);

module.exports = router;
