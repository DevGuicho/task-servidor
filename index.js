const express = require('express');
const app = express();
const debug = require('debug')('app:server');
const { config } = require('./config');
const proyectosApi = require('./routes/proyectos');
const conectarDB = require('./config/db');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

proyectosApi(app);

conectarDB();

app.listen(config.port, () => debug(`Server on port ${config.port}`));
