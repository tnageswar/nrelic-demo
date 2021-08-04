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
function getAllUsers(inOffset, inLimit, search) {
    const start = inOffset ?? 0;
    const end = +start + (+inLimit ?? 10);
    logger.debug(
        `DAO Pagination[start:${start}, end:${end}] and search ${search}`
    );
    const filteredData = data
        .filter(
            (user) =>
                user.first_name.startsWith(search) ||
                user.last_name.startsWith(search)
        )
        .map((user) => {
            return {
                id: user['uid'],
                userName: `${user['first_name']}, ${user['last_name']}`,
                companyName: user['company_name'],
            };
        });
    const finalData = filteredData.slice(start, end);
    return {
        headers,
        users: finalData,
        totalCount: filteredData.length,
    };
}

module.exports.getAllUsers = getAllUsers;
