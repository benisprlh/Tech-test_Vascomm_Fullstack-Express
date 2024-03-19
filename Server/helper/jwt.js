const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const signToken = (payload) => {
  return jwt.sign(payload, secret);
};

const token = signToken('abcdefgh');

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  signToken,
  verifyToken,
};
