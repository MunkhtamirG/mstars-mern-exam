const express = require("express");
const router = express.Router();
const booksRoute = require("../v1/books.routes");

router.use("/books", booksRoute);

module.exports = router;
