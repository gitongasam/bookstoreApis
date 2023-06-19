const Joi = require('joi');
const config = require('../config/config.js');
const mssql = require('mssql');
const bcrypt = require('bcrypt');
require('dotenv').config();
const getAUser = require('../utils/getAUser');
const { tokenGenerator } = require("../utils/token");
const userSchema = Joi.object({
  MemberID: Joi.string().required(),
  Name: Joi.string().required(),
  Address: Joi.string().required(),
  ContactNumber: Joi.string().required(),
  Password: Joi.string().pattern(new RegExp("^[A-Za-z0-9]")).required(),
  c_password: Joi.ref("Password")

}).with("Password", "c_password");

module.exports = {
  postUser: async (req, res) => {
    try {
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const user = value;
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
        res.json(results);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while adding the user.');
    }
  },

  loginUser: async (req, res) => {
    try {
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      let { MemberID, Password } = value;
      let user = await getAUser(MemberID);
      if (user) {
        let passwordsMatch = await bcrypt.compare(Password, user.Password);
        if (passwordsMatch) {
          let token = await tokenGenerator({
            MemberID: user.MemberID,
            roles: "admin"
          });
          res.status(200).json({ success: true, message: "Logged in successfully", token });
        } else {
          res.status(401).json({ success: false, message: "Wrong credentials" });
        }
      } else {
        res.status(404).json({ success: false, message: "No user found" });
      }
    } catch (error) {
      res.json(error);
    }
  }
};
