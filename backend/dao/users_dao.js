const data = require('../database/data.json');
const logger = require('../utils/logger');
function getAllUsers(inOffset, inLimit) {
    const start = inOffset ?? 0;
    const end = start + (inLimit ?? 10);
    logger.debug(`DAO Pagination[start:${start}, end:${end}]`);
    return {
        users: data
            .map((user) => {
                return {
                    first_name: user['first_name'],
                    last_name: user['last_name'],
                    company_name: user['company_name'],
                };
            })
            .slice(start, end),
    };
}

module.exports.getAllUsers = getAllUsers;
