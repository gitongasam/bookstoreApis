const mssql = require('mssql');
const config = require('../config/config');

async function deleteMember(req, res) {
  try {
    const id  = req.params.id;

    let sql = await mssql.connect(config);
    if (!sql.connected) {
      return res.status(500).json({ error: 'Failed to connect to the database' });
    }
    let result = await sql.request().input("MemberID", mssql.Int, id).query(`UPDATE dbo.Members SET is_deleted = 1 WHERE Memberid = @MemberID`);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({ message: 'Member was  successfully removed from the database' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = {
  deleteMember
};
