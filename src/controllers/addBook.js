const mssql = require('mssql');
const config = require('../config/config');
  
  async function addBook(req, res) {
    try {
      const { BookID, Title, Author, PublicationYear } = req.body;
      let salt = await bcrypt.gensalt(8);
      const hashed_pwd = await bycrypt.hash(PublicationYear.password, salt)
      if (!BookID || !Title || !Author || !PublicationYear) {
        return res.status(400).json({ error: 'BookID, Title, Author, and PublicationYear are required' });
      }
  
      let sql = await mssql.connect(config);
      if (sql.connected) {
        const query = `INSERT INTO dbo.Books (BookID, Title, Author, PublicationYear) VALUES (${BookID}, '${Title}', '${Author}', '${PublicationYear}')`;
        let result = await sql.query(query);
        console.log(result.recordset);
  
        // Send the inserted book data as the response
        
        res.status(200).send(`your have sucesfully added a book=${BookID}, '${Title}', '${Author}', '${PublicationYear}`)
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
      res.send(hashed_pwd);
    }
  }

module.exports = {
    addBook
}

