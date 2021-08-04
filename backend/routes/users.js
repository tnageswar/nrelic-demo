const express = require('express');
const router = express.Router();

const users_dao = require('../dao/users_dao');
const { query } = require('express-validator');
const logger = require('../utils/logger');
const validateRequest = require('../middleware/validate-requests');

router.get(
    '/',
    [
        query('offset').optional().isInt(),
        query('limit').optional().isInt(),
        query('sort').optional().isInt(),
    ],
    validateRequest,
    (req, res) => {
        logger.debug(
            `Query[offset:${req.query.offset}, limit:${req.query.limit}, ` +
                `search:${req.query.search}, filterbycompany: ${req.query.filterbycompany}` +
                `, sort: ${req.query.sort}]`
        );
        res.send(
            users_dao.getAllUsers(
                req.query?.offset ?? 0,
                req.query?.limit ?? 10,
                req.query?.search ?? '',
                req.query?.filterbycompany ?? '',
                req.query?.sort ?? 1
            )
        );
    }
);

module.exports = router;
