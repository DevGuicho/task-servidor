const express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('../config/index');
const UsuariosServices = require('../services/usuarios');
const validationHandler = require('../utils/middleware/validationHandler');
const { createUserSchema } = require('../utils/schemas/users');

function usersApi(app) {
  const router = express.Router();
  const usuariosServices = new UsuariosServices();

  app.use('/api/usuarios', router);

  router.post('/', validationHandler(createUserSchema), async (req, res) => {
    const usuario = req.body;

    const userCreated = await usuariosServices.crearUsuario(usuario);
    const payload = {
      usuario: { id: userCreated },
    };
    const token = jwt.sign(payload, config.authJwtSecret, {
      expiresIn: '60m',
    });

    res.json({
      data: userCreated,
      message: 'user created',
      token,
    });
  });
}

module.exports = usersApi;
