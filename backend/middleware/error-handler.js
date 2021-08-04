const { XrgBaseError } = require('../errors/errors');
const logger = require('../utils/logger');
const errorHandler = (err, req, res, next) => {
    logger.error(`Errorrr : ${err?.constructor?.name}`);
    //logger.error(err.stack);
    if (err instanceof XrgBaseError) {
        return res.status(err.statusCode).send({ errors: err.errorData() });
    }

    res.status(500).send({
        errors: [{ message: 'Internal Error' }],
    });
};

module.exports = errorHandler;
