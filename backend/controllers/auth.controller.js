const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookie = require('cookie-parser');

async function login(req, res, next) {
  const {cedula, password } = req.body;
  
  const user = await User.findUser(cedula);
  const passIsValid = bcrypt.compare(password, user.password)
  if  (!passIsValid) {
    return res.status(401).send({ error: 'Credenciales inválidas' });
  }
  if (user.error) {
    return res.status(401).send({ error: user.error });
  }
  const token = jwt.sign(
    { cedula: user.cedula, user: user },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );


  // only localhost
  res.cookie ('token', token, {
    httpOnly: false,
    secure: false, // Set to true if using HTTPS
    });
}

async function logout(req, res, next) {
  res.clearCookie('token');
  res.status(200).send({ message: 'Logout successful' });
}

module.exports = {
  login,
  logout
};
