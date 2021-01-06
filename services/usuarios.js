const bcrypt = require('bcryptjs');
const MongoLib = require('../libs/mongo');

class UsuariosServices {
  constructor() {
    this.collection = 'usuarios';
    this.mongoDB = new MongoLib();
  }
  async getUserByEmail({ email }) {
    const user = await this.mongoDB.getByEmail(this.collection, email);
    return user;
  }
  async crearUsuario(usuario) {
    const { nombre, email, password } = usuario;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      nombre,
      email,
      password: hashedPassword,
    });

    return createUserId;
  }
}

module.exports = UsuariosServices;
