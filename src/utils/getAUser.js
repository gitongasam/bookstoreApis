const mssql = require('mssql')
const config = require('../config/config')

async function getAUser(user_id){
    let sql = await mssql.connect(config);
        if(sql.connected){
            let results = await sql.request()
                                .input("MemberID", user_id)
                                .execute("dbo.getMembersByID")

            let user = results.recordset[0]

            return user
        }else{
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
}

module.exports = getAUser;