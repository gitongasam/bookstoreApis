const mssql = require('mssql');
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

module.exports = {
    getAllMembers
}