const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerator = async (data) => {
  const expiresIn = '1h'; // change to the time you need the token to work

  return jwt.sign(data, process.env.SECRET, { expiresIn });
};

const tokenVerifier = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = { tokenGenerator, tokenVerifier };
