const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { config } = require('../../config/index');
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) return next(boom.unauthorized('No hay token'));

  try {
    const cifrado = jwt.verify(token, config.authJwtSecret);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    return next(boom.unauthorized('Token invalido'));
  }
};
