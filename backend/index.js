const config = require('config');
const express = require('express');
const cors = require('cors');
require('express-async-errors');
const { query } = require('express-validator');
const users_dao = require('./dao/users_dao');
const logger = require('./utils/logger');
const morganMiddleware = require('./middleware/morganMiddleware');
const errorHandler = require('./middleware/error-handler');
const { XrgNotFound } = require('./errors/errors');
const validateRequest = require('./middleware/validate-requests');

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(morganMiddleware);

app.get(
    '/api/nrelic/users',
    [query('offset').optional().isInt(), query('limit').optional().isInt()],
    validateRequest,
    (req, res) => {
        logger.debug(
            `Pagination[offset:${req.query.offset}, limit:${req.query.limit}]`
        );
        res.send(
            users_dao.getAllUsers(
                req.query?.offset ?? 0,
                req.query?.limit ?? 10
            )
        );
    }
);
app.all('*', (req, res) => {
    logger.error('End point is not supported.');
    throw new XrgNotFound('End point is not supported');
});

app.use(errorHandler);

const server = app.listen(config.get('server.port'), () => {
    logger.info(`Listening on ${config.get('server.port')}`);
});
