const mssql = require('mssql');
const config = require('../config/config');
const sendMail = require('../utils/sendEmail');
  

async function borrowBook(req, res) {
  try {
    const bookID = req.params.id;

    const sql = await mssql.connect(config);

    const result = await sql
      .request()
      .input('bookID', mssql.Int, bookID)
      .execute(`dbo.borrowed_book`)

    const borrowedBook = result.recordset[0];
    res.status(200).send(`Book borrowed successfully. \n\nBook details: ${JSON.stringify(borrowedBook)}`);
    sendMail(`@MemberEmail`, "Book borrowed!", "Book borrowed successfully");

  } catch (error) {
    // console.error('Error borrowing book:', error);
    res.status(500).send('An error occurred while borrowing the book.');
  }
}

module.exports = {
    borrowBook
}