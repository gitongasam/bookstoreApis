const { tokenVerifier } = require('../utils/token');

const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {

  const token = req.headers['authorization']&&req.headers['authorization']. split(" ")[1];

  if (!token) {

    return res.status(401).json({ error: 'No token provided' });

  }

  try {

    const decodedToken = tokenVerifier(token);

    // Attach the decoded token to the request object for further use

    req.user = decodedToken;
// Proceed to the next middleware or route handler

    next();

  } catch (error) {

    return res.status(403).json({ error: 'Invalid token' });

  }

};

module.exports = authenticationMiddleware;