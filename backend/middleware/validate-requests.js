const { validationResult } = require('express-validator');
const { XrgValidationError } = require('../errors/errors');

const validateRequest = (req, _, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new XrgValidationError(errors.array());
    }

    next();
};

module.exports = validateRequest;
