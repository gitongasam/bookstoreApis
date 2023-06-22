const mssql = require('mssql');
const config = require('../config/config');
const { tokenVerifier } = require('../utils/token');

async function getAllBooks(req, res, next) {
  try {
    let token = req.headers['authorization'] ? req.headers['authorization'].split(" ")[1] : null;
    if (token) {
      let user = await tokenVerifier(token);
      if (user.roles === "admin") {
        let sql = await mssql.connect(config);
        if (sql.connected) {
          let results = await sql.query('SELECT *FROM dbo.books WHERE is_deleted = 0;');
          res.json(results.recordset);
        }
      } else {
        res.status(403).json({ error: 'Access denied. Only admins can access this route.' });
      }next()
    } else {
      let sql = await mssql.connect(config);
      if (sql.connected) {
        let results = await sql.query('SELECT TOP 5 * FROM dbo.Books WHERE is_deleted =0');
        res.json(results.recordset)
      }e
    }
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllBooks
};
