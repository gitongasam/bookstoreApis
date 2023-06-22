const mssql = require('mssql');
const config = require('../config/config');

async function deleteBook(req, res) {
  try {
    const id  = req.params.id;

    let sql = await mssql.connect(config);
    if (!sql.connected) {
      return res.status(500).json({ error: 'Failed to connect to the database' });
    }
    let result = await sql.request().input("bookID", mssql.Int, id).query(`UPDATE dbo.books SET is_deleted = 1 WHERE bookid = @bookID`);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = {
  deleteBook
};
