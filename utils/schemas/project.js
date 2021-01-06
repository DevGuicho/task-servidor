const joi = require('@hapi/joi');

const projectIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createProjectSchema = {
  nombre: joi.string().max(100).required(),
  creado: joi.date(),
};

module.exports = {
  projectIdSchema,
  createProjectSchema,
};
