const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, 'anykey', { expiresIn: '5d' });

module.exports = generateToken;
