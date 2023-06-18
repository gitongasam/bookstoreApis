const mssql = require('mssql');
const config = require('../config/config')

async function deleteBook(){
    try{
    const {id} = req.params;
    const index= books.findIndex(book=>book.id=== parseInt(id));
    
if(id=== -1){
res.status(500).json({erorr:"internal server error"});
let sql = await mssql.connect(config);
if (sql.connected) {
    const query=`DELETE from dbo.books`
    let result = await sql.query(query);
    console.log(result.recordset);
}
res.json({message:"dleted succesfully"})
    }
}
    catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    };
 
}


module.exports ={
    deleteBook
}