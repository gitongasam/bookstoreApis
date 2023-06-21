
const  jwt = require("jsonwebtoken");
const { error } = require("../validators/userValidators");
require("dotenv").config();


const authenticationMiddleware = (req, res, next) => {
  const token = req.headers['authorization']&& req.headers['authorization'].split(" ")[1];

  if(token){
    jwt.verify(token, process.env.SECRET, (err,decodedToken )=>{

      if(err){
        return res.status(403).json({ error: 'Invalid token' });
      } else{
        req.user= decodedToken;

        next()
      }

    })
  }else{
    return res.status(401).json({ error: 'No token provided' });

  }
 
//   
}

module.exports = authenticationMiddleware;
