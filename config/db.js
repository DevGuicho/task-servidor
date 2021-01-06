const debug = require('debug')('app:database');
const mongoose = require('mongoose');
const { config } = require('./index');

const conectarDB = async () => {
  try {
    await mongoose.connect(config.dbMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    debug('DB conectada');
  } catch (error) {
    debug(error);
    process.exit(1);
  }
};

module.exports = conectarDB;
