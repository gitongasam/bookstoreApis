const mssql = require('mssql');
const config = require('../config/config');
const sendMail = require('../utils/sendEmail');
  

async function borrowBook(req, res) {
  try {
    const bookID = req.params.id;
    const memberID = req.body.MemberID;
    // console.log(memberID);

    const sql = await mssql.connect(config);

    const result = await sql
      .request()
      .input('bookID', mssql.Int, bookID)
      .input('memberID', mssql.Int, memberID)
      .query(`UPDATE dbo.Books WHERE Status = 'Available'
              SET Status = 'Loaned'
              WHERE BookID = @bookID;
              SELECT email
              FROM dbo.Members WHERE MemberID = @memberID`);

    const borrowedBook = result.recordset[0];
    res.status(200).send(`Book borrowed successfully.`);
    sendMail(`${borrowedBook.email}`, "Book borrowed!", "Book borrowed successfully");

  } catch (error) {
    // console.error('Error borrowing book:', error);
    res.status(500).send('An error occurred while borrowing the book.');
  }
}

module.exports = {
    borrowBook
}