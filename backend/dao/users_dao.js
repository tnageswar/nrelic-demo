const data = require('../database/data.json');
const logger = require('../utils/logger');
const headers = [
    { field: 'uid', headerName: 'UID' },
    {
        field: 'userName',
        headerName: 'User Name',
    },
    {
        field: 'company_name',
        headerName: 'Company',
    },
];
function getAllUsers(inOffset, inLimit) {
    const start = inOffset ?? 0;
    const end = +start + (+inLimit ?? 10);
    logger.debug(`DAO Pagination[start:${start}, end:${end}]`);
    return {
        headers,
        users: data.slice(start, end).map((user) => {
            return {
                uid: user['uid'],
                userName: `${user['first_name']}, ${user['last_name']}`,
                companyName: user['company_name'],
            };
        }),
    };
}

module.exports.getAllUsers = getAllUsers;
