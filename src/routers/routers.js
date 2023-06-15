const express = require('express');

const { borrowBook, returnBook } = require('../controllers/controllers');
const { getAllBooks, getBookById, addBook} = require('../controllers/controllers');

const router = express.Router();

router.get('/books/borrow/:id', borrowBook)
router.get('/books/return/:id', returnBook)
router.get('/allmembers',getAllMembers)
router.post('/members',registerMember)
router.get('/memberbyid/:id',getMemberById)
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books',addBook)

module.exports = router;
