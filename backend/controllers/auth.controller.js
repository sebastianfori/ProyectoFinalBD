const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookie = require('cookie-parser');

async function login(req, res) {
  const { cedula, password } = req.body;

  const user = await User.findUser(cedula);

  if (user.error) {
    return res.status(401).json({ error: user.error });
  }

  const passIsValid = await bcrypt.compare(password, user.password);

  if (!passIsValid) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { cedula: user.usuario.Cedula, tipo: user.tipo },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // true si usás HTTPS
    sameSite: 'Lax',
  });

 res.status(200).json({
  message: 'Login exitoso',
  tipo: user.tipo // ← esto lo usás en el front
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
