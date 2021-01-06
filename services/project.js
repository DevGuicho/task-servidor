const MongoLib = require('../libs/mongo');

class ProjectServices {
  constructor() {
    this.collection = 'proyectos';
    this.mongoDB = new MongoLib();
  }

  async getProjects(projectId) {
    const query = projectId && { creador: projectId };
    const projects = await this.mongoDB.getAll(this.collection, query);
    return projects;
  }

  async createProject(project) {
    const projectCreated = await this.mongoDB.create(this.collection, {
      ...project,
      creado: Date.now(),
    });
    return projectCreated;
  }
  async updateProject(id, project) {
    const updatedProjectId = await this.mongoDB.update(
      this.collection,
      id,
      project
    );
    return updatedProjectId;
  }
  async deleteProject(id) {
    const deletedIdProject = await this.mongoDB.delete(this.collection, id);
    return deletedIdProject;
  }
}

module.exports = ProjectServices;
