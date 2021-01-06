const express = require('express');
const {
  createProjectSchema,
  projectIdSchema,
} = require('../utils/schemas/project');
const validationHandler = require('../utils/middleware/validationHandler');
const ProjectServices = require('../services/project');
const auth = require('../utils/middleware/auth');

function projectsApi(app) {
  const router = express.Router();
  app.use('/api/proyectos', router);
  const projectServices = new ProjectServices();

  router.get('/', auth, async (req, res) => {
    const projects = await projectServices.getProjects(req.usuario.id);

    res.json({
      data: projects,
      message: 'Projects list',
    });
  });
  router.get('/:id', auth, validationHandler(projectIdSchema), (req, res) => {
    res.send('hola');
  });
  router.post(
    '/',
    validationHandler(createProjectSchema),
    auth,
    async (req, res) => {
      let project = req.body;
      project.creador = req.usuario.id;
      const projectCreated = await projectServices.createProject(project);

      res.json({
        data: projectCreated,
        message: 'Project created',
      });
    }
  );

  router.put(
    '/:id',
    auth,
    validationHandler({ id: projectIdSchema }, 'params'),
    validationHandler(createProjectSchema),
    async (req, res) => {
      const project = req.body;
      const { id } = req.params;

      const updatedProject = await projectServices.updateProject(id, project);

      res.json({
        data: updatedProject,
        message: 'Project updated',
      });
    }
  );
  router.delete(
    '/:id',
    auth,
    validationHandler({ id: projectIdSchema }, 'params'),
    async (req, res) => {
      const { id } = req.params;
      const idProjectDeleted = await projectServices.deleteProject(id);
      res.json({
        data: idProjectDeleted,
        message: 'Project deleted',
      });
    }
  );
}
module.exports = projectsApi;
