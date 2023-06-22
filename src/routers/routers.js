const express = require('express');
const { getAllBooks } = require('../controllers/getAllBooks.js')
const { getBookById } =  require('../controllers/getBookByID.js')
const { addBook } = require('../controllers/addBook.js')
const { borrowBook } = require('../controllers/borrowBook.js') 
const { returnBook } = require('../controllers/returnBook.js')
const { getAllMembers } = require('../controllers/getAllMembers.js')
const { registerMember } = require('../controllers/registerMembers.js')
const { getMemberById } = require('../controllers/getMemberByID.js')
const { deleteBook } = require('../controllers/deleteBook.js')
const { deleteMember } = require('../controllers/deletemember.js')


const router = express.Router();

router.put('/books/borrow/:id', borrowBook)
router.put('/books/return/:id', returnBook)
router.get('/allmembers',getAllMembers)
router.post('/members',registerMember)
router.get('/memberbyid/:id',getMemberById)
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books',addBook);
router.delete('/books/delete/:id',deleteBook)
router.delete('/member/delete/:id',deleteMember)


module.exports = router;
