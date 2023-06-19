const mssql = require('mssql');
const config = require('../config/config');
const { tokenVerifier } = require('../utils/token');

  
  async function getAllBooks(req, res) {
    //before getting a book, we want to verify if the person is logged in

    let token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    try {
      let user = await tokenVerifier(token)
      if(user.roles === "admin"){ //if only an admin can access this route
        let sql = await mssql.connect(config);
        if (sql.connected) {
          let results = await sql.query('SELECT * FROM dbo.Books');
          res.json(results.recordset);
        }

      }


    } catch (error) {
      console.error('Error retrieving books:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {
    getAllBooks
}