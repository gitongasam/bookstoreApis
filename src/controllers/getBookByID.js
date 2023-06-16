const mssql = require('mssql');
const config = require('../config/config');
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

module.exports = {
    getBookById
}