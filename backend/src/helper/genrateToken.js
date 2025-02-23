const moment = require('moment');
const jwt = require('jsonwebtoken');

const generateToken = async (Id, expires = process.env.JWT_EXPIRES, secret = process.env.JWT_SECRET_KEY) => {
  try {
    const payload = {
      userId: Id,
      iat: moment().unix()
    };
    return jwt.sign(payload, secret);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {generateToken}