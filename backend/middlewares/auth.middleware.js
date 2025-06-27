const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(400).send({ message: 'inofrmacion de headers mal' });
  }
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).send({ message: 'Token no provisto' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: 'Token inválido' });
  }
}

module.exports = authMiddleware;
