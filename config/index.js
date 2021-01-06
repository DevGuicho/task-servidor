require('dotenv').config();

const config = {
  port: process.env.PORT || 4000,
  dbMongo: process.env.MONGO_DB,
};

module.exports = { config };
