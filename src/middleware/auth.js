const jwt = require('jsonwebtoken');

const SECRET = 'mentorpoints_secret';

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

function isAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Acesso restrito a administradores' });
  }
  next();
}

function isStudent(req, res, next) {
  if (!req.user || req.user.isAdmin) {
    return res.status(403).json({ error: 'Acesso restrito a estudantes' });
  }
  next();
}

module.exports = { authenticateJWT, isAdmin, isStudent, SECRET };
