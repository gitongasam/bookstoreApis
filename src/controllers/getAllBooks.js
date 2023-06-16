const mssql = require('mssql');
const config = require('../config/config');

  
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

module.exports = {
    getAllBooks
}