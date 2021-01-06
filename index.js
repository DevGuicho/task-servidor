const express = require('express');
const app = express();
const debug = require('debug')('app:server');
const { config } = require('./config');
const authApi = require('./routes/auth');
const projectApi = require('./routes/projects');
const usersApi = require('./routes/users');

const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandler');

const notFounHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

projectApi(app);
usersApi(app);
authApi(app);

// Catch 404
app.use(notFounHandler);

//Errors Middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => debug(`Server on port ${config.port}`));
