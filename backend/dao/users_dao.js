const data = require('../database/data.json');
const logger = require('../utils/logger');
const headers = [
    { field: 'id', headerName: 'UID', width: 110 },
    {
        field: 'userName',
        headerName: 'User Name',
        width: 250,
    },
    {
        field: 'companyName',
        headerName: 'Company',
        width: 250,
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
                id: user['uid'],
                userName: `${user['first_name']}, ${user['last_name']}`,
                companyName: user['company_name'],
            };
        }),
        totalCount: data.length,
    };
}

module.exports.getAllUsers = getAllUsers;
