const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerator = async (data) => {
  const expiresIn = '10s'; // Set the expiry time as desired, e.g., '1h' for 1 hour

  return jwt.sign(data, process.env.SECRET, { expiresIn });
};

const tokenVerifier = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = { tokenGenerator, tokenVerifier };
