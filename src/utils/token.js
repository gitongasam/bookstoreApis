const jwt = require('jsonwebtoken');
require('dotenv').config()

const tokenGenerator = async(data) =>{
    return jwt.sign(data, process.env.SECRET)
    
}

const tokenVerifier = (token) =>{
    return jwt.verify(token, process.env.SECRET)
}
module.exports = {tokenGenerator, tokenVerifier}