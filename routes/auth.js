const express = require('express');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { config } = require('../config/index');
const UsuariosServices = require('../services/usuarios');
const validationHandler = require('../utils/middleware/validationHandler');
const { loginUserSchema } = require('../utils/schemas/users');

function authApi(app) {
  const router = express.Router();
  const usuariosServices = new UsuariosServices();

  app.use('/api/auth', router);

  router.post(
    '/',
    validationHandler(loginUserSchema),
    async (req, res, next) => {
      const usuario = req.body;

      const user = await usuariosServices.getUserByEmail(usuario);
      if (!user) return next(boom.unauthorized('El usuario no existe'));
      const passCorrecto = await bcrypt.compare(
        usuario.password,
        user.password
      );
      if (!passCorrecto) return next(boom.unauthorized('Password incorrecto'));
      const payload = {
        usuario: { id: usuario.id },
      };
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: '60m',
      });

      res.json({
        data: { ...user, token },
        message: 'user created',
      });
    }
  );
}

module.exports = authApi;
