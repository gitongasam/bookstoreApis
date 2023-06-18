const config = require('../config/config');
const mssql = require('mssql');
const bcrypt = require('bcrypt');
require('dotenv').config()
const getAUser = require('../utils/getAUser')
const { tokenGenerator } = require("../utils/token")

module.exports = {
  postUser: async (req, res) => {
    try {
      const user = req.body;
      const hashedPwd = await bcrypt.hash(user.Password, 8);
      
      const sql = await mssql.connect(config);
      
      if (sql.connected) {
        const request = new mssql.Request(sql);
        
        request.input('MemberID', user.MemberID)
          .input('Name', user.Name)
          .input('Address', user.Address)
          .input('ContactNumber', user.ContactNumber)
          .input('Password', hashedPwd);
        
        const results = await request.execute('dbo.addMembers');
        // console.log(results);
        res.json(results);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while adding the user.');
    }
  },

  loginUser: async(req, res)=>{
    let { MemberID, Password } =req.body;
    try {
        let user = await getAUser(MemberID)
            if(user){
                let passwords_match = await bcrypt.compare(Password, user.Password)
                if(passwords_match){
                  let token = await tokenGenerator({
                    MemberID: user.MemberID,
                    roles: "admin"
                  })
                  res.status(200).json({success: true, message: "logged in successfully", token})
                }else{
                  res.status(401).json({success:false, message:"wrong credentials"})
                }                                
            }else{
                res.status(404).json({success: false, message:"No user found"})
            }
        
    } catch (error) {
        res.json(error)
    }
  }
};
