const express = require('express');

const { borrowBook, returnBook } = require('../controllers/controllers');

const router = express.Router();

router.get('/books/borrow/:id', borrowBook)
router.get('/books/return/:id', returnBook)
module.exports = router;
