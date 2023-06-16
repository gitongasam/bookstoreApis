const mssql = require('mssql');
const config = require('../config/config');
  
  
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

  module.exports = {
    registerMember
  }