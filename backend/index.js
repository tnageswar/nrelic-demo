const config = require('config');
const express = require('express');
const cors = require('cors');
const users_dao = require('./dao/users_dao');
const logger = require('./utils/logger');
const morganMiddleware = require('./middleware/morganMiddleware');

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(morganMiddleware);

logger.debug('Hlloooo which color am I, and which level');
logger.info('Hlloooo which color am I, and which level');
logger.http('Hlloooo which color am I, and which level');
logger.warn('Hlloooo which color am I, and which level');
logger.error('Hlloooo which color am I, and which level');

app.use(function (err, req, res, next) {
    res.status(500).send('Some internal error occurred');
});

app.get('/nrelic/users', (req, res) => {
    res.send(users_dao.getAllUsers());
});

const server = app.listen(config.get('server.port'), () => {
    logger.info(`Listening on ${config.get('server.port')}`);
});
