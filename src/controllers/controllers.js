const mssql = require('mssql');
<<<<<<< HEAD
const config = require('../config/config');
async function getAllMembers(req, res) {
    try {
      let sql = await mssql.connect(config);
      if (sql.connected) {
        let results = await sql.query('SELECT * FROM dbo.Members');
        res.json(results.recordset);
      }
    } catch (error) {
      console.error('Error retrieving members:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  
  async function registerMember(req, res) {
    try {
      const { MemberId, Name, Address, ContactNumber } = req.body;
      if (!MemberId || !Name || !Address || !ContactNumber) {
        return res.status(400).json({ error: 'MemberId, Name, Address, and ContactNumber are required' });
      }
  
      let sql = await mssql.connect(config);
      if (sql.connected) {
        const query = `INSERT INTO dbo.Members (MemberId, Name, Address, ContactNumber) VALUES (${MemberId}, '${Name}', '${Address}', '${ContactNumber}')`;
        let result = await sql.query(query);
        console.log(result);
  
        // Send the inserted book data as the response
        res.json({ MemberId, Name, Address, ContactNumber });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  
  async function getMemberById(req, res) {
    try {
      const memberId = req.params.id;
  
      // Connect to the SQL Server
      const sql = await mssql.connect(config);
      if (sql.connected) {
        // Query the Members table for the specific member
        const result = await sql.query(
          `SELECT * FROM dbo.Members WHERE MemberID = ${memberId}`
        );
  
        if (result.recordset.length === 0) {
          res.status(404).json({ message: 'Member not found' });
        } else {
          const member = result.recordset[0];
          res.status(200).json(member);
        }
      } else {
        res.status(500).json({ error: 'Database connection error' });
      }
    } catch (error) {
      console.error('Error retrieving member:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

async function borrowBook(req, res) {
  try {
    const bookID = req.params.id;

    const sql = await mssql.connect(config);

    const result = await sql
      .request()
      .input('bookID', mssql.Int, bookID)
      .query(`UPDATE dbo.Books
              SET Status = 'Loaned'
              WHERE BookID = @bookID;
              SELECT * FROM dbo.Books WHERE BookID = @bookID`);

    const borrowedBook = result.recordset[0];
    res.status(200).send(`Book borrowed successfully. \n\nBook details: ${JSON.stringify(borrowedBook)}`);

  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).send('An error occurred while borrowing the book.');
  }
}

async function returnBook(req, res) {
  try {
    const bookID = req.params.id;

    const sql = await mssql.connect(config);

    const result = await sql
      .request()
      .input('bookID', mssql.Int, bookID)
      .query(`UPDATE dbo.Books
              SET Status = 'Available'
              WHERE BookID = @bookID;
              SELECT * FROM dbo.Books WHERE BookID = @bookID`);
    const returnedBook = result.recordset[0];
    res.status(200).send(`Book returned successfully. \n\nBook details: ${JSON.stringify(returnedBook)}`);

  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).send('An error occurred while returning the book.');
  }
}

module.exports = {
<<<<<<< HEAD
  getAllMembers,
  registerMember,
  getMemberById
}
=======
const config = require('../config/config')

async function getBookById(req, res) {
    try {
      const { id } = req.params;
  
      let sql = await mssql.connect(config);
      if (sql.connected) {
        let result = await sql.query(`SELECT * FROM dbo.Books WHERE BookID = ${id}`);
        console.log(result);
  
        if (result.recordset.length === 0) {
          return res.status(404).json({ error: 'Book not found' });
        }
  
        const book = result.recordset[0];
        res.json(book);
    
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  
  async function addBook(req, res) {
    try {
      const { BookID, Title, Author, PublicationYear } = req.body;
      if (!BookID || !Title || !Author || !PublicationYear) {
        return res.status(400).json({ error: 'BookID, Title, Author, and PublicationYear are required' });
      }
  
      let sql = await mssql.connect(config);
      if (sql.connected) {
        const query = `INSERT INTO dbo.Books (BookID, Title, Author, PublicationYear) VALUES (${BookID}, '${Title}', '${Author}', '${PublicationYear}')`;
        let result = await sql.query(query);
        console.log(result);
  
        // Send the inserted book data as the response
        res.json({ BookID, Title, Author, PublicationYear });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  
  async function getAllBooks(req, res) {
    try {
      let sql = await mssql.connect(config);
      if (sql.connected) {
        let results = await sql.query('SELECT * FROM dbo.Books');
        res.json(results.recordset);
      }
    } catch (error) {
      console.error('Error retrieving books:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  module.exports={
    getAllBooks,
    addBook,
    getBookById
  }
>>>>>>> 47df602fe3ccaf364d60ce5b065988d91df843de
=======
  borrowBook,
  returnBook,
};
>>>>>>> 47acd864e20e5b551f906e1986628c1bcd8d141c
