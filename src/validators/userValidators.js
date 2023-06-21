const Joi = require('joi');

const userSchema = Joi.object({
    MemberID: Joi.number().required(),
    Name: Joi.string().required(),
    Address: Joi.string().required(),
    ContactNumber: Joi.string().required(),
    Password: Joi.string().pattern(new RegExp("^[A-Za-z0-9]")).required(),
    c_password: Joi.ref("Password"),
    email: Joi.string().required()
  
  }).with("Password", "c_password");


  module.exports = userSchema;