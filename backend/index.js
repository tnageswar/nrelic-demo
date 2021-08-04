const config = require('config');
const express = require('express');
const cors = require('cors');
require('express-async-errors');

const logger = require('./utils/logger');
const morganMiddleware = require('./middleware/morganMiddleware');
const errorHandler = require('./middleware/error-handler');
const { XrgNotFound } = require('./errors/errors');
const users = require('./routes/users');

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(morganMiddleware);

app.use('/api/nrelic/users', users);

app.all('*', (req, res) => {
    logger.error('End point is not supported.');
    throw new XrgNotFound('End point is not supported');
});

app.use(errorHandler);

const server = app.listen(config.get('server.port'), () => {
    logger.info(`Listening on ${config.get('server.port')}`);
});
