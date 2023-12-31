const mssql = require('mssql');
const config = require('../config/config');
const { tokenVerifier } = require('../utils/token');

async function getAllMembers(req, res) {
  let token = req.headers['authorization'] ? req.headers['authorization'].split(" ")[1] : null;
  try{
    if (token) {
      let user = await tokenVerifier(token);
      if (user.roles === "admin") {
        let sql = await mssql.connect(config);
        if (sql.connected) {
          let results = await sql.query('SELECT * FROM dbo.Members');
          res.json(results.recordset);
        }
  }}}
   catch (error) {
      console.error('Error retrieving members:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {
    getAllMembers
}