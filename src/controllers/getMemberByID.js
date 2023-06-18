const mssql = require('mssql');
const config = require('../config/config');
  
  
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
    getMemberById
  }