const mssql = require('mssql');
const config = require('../config/config');
const sendMail = require('../utils/sendEmail');
  

async function returnBook(req, res) {
  try {
    const bookID = req.params.id;
    const memberID = req.body.MemberID;
    // console.log(memberID);

    const sql = await mssql.connect(config);

    const result = await sql
      .request()
      .input('bookID', mssql.Int, bookID)
      .input('memberID', mssql.Int, memberID)
      .query(`UPDATE dbo.Books WHERE Status = 'Loaned'
              SET Status = 'Available'
              WHERE BookID = @bookID;
              SELECT email
              FROM dbo.Members WHERE MemberID = @memberID`);

    const returnedBook = result.recordset[0];
    res.status(200).send(`Book returned successfully.`);
    sendMail(`${returnedBook.email}`, "Book returned!", "Book returned successfully");

  } catch (error) {
    // console.error('Error returning book:', error);
    res.status(500).send('An error occurred while returning the book.');
  }
}

module.exports = {
    returnBook
}