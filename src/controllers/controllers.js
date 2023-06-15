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
  

module.exports = {
  getAllMembers,
  registerMember,
  getMemberById
}