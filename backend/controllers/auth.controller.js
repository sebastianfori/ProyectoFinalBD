const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

function register(req, res) {
  User.register(req.body, (err, data) => {
    if (err) return res.status(400).send(err);
    res.send({ mensaje: 'Usuario registrado' });
  });
}

function login(req, res) {
  const { email, password } = req.body;
  User.login(email, password, (err, user) => {
    if (err) return res.status(401).send(err);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.send({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    });
  });
}

module.exports = {
  register,
  login
};
