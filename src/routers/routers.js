const express = require ('express');
const { getAllBooks } = require('../controllers/getAllBooks.js');
const { getBookById } = require('../controllers/getBookByID.js');
const { addBook } = require('../controllers/addBook.js');
const { borrowBook } = require('../controllers/borrowBook.js');
const { returnBook } = require('../controllers/returnBook.js');
const { getAllMembers } = require('../controllers/getAllMembers.js');
const { registerMember } = require('../controllers/registerMembers.js');
const { getMemberById } = require('../controllers/getMemberByID.js');
const { deleteBook } = require('../controllers/deleteBook.js');
const authenticationMiddleware = require('../middlewares/middlewares.js');


const bookRouter = express.Router();

bookRouter.get('/books/borrow/:id', borrowBook);
bookRouter.get('/books/return/:id', returnBook);

bookRouter.post('/members', registerMember);
bookRouter.get('/memberbyid/:id', getMemberById);
bookRouter.get('/books/:id', getBookById);
bookRouter.post('/books', addBook);
bookRouter.delete('/books/delete/:id', deleteBook);

bookRouter.use(authenticationMiddleware);

bookRouter.get('/books', getAllBooks);
bookRouter.get('/allmembers', getAllMembers);



module.exports = bookRouter;
