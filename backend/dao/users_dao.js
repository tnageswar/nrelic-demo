const data = require('../database/data.json');
const logger = require('../utils/logger');

const companySet = new Set();
data.forEach((user) => {
    companySet.add(user.company_name);
});
const companyMatched = (companyName, filterComp) => {
    if (filterComp) {
        return companyName === filterComp;
    } else {
        return true;
    }
};
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
const sortOptions = {
    0: { field: 'first_name', asc: false, label: 'First Name, Descending' },
    1: { field: 'first_name', asc: true, label: 'First Name, Ascending' },
    2: { field: 'last_name', asc: false, label: 'Last Name, Descending' },
    3: { field: 'last_name', asc: true, label: 'Last Name, Ascending' },
    4: { field: 'companyName', asc: false, label: 'Company Name, Descending' },
    5: { field: 'companyName', asc: true, label: 'Company Name, Ascending' },
};
function getAllUsers(inOffset, inLimit, search, filterbycompany, sort) {
    const sortBy = +(sort ?? 1);
    const start = +(inOffset ?? 0);
    const end = +start + (+inLimit ?? 10);
    logger.debug(
        `DAO Pagination[start:${start}, end:${end}] and search ${search}`
    );
    const filteredData = data
        .filter(
            (user) =>
                user.first_name
                    .toUpperCase()
                    .startsWith(search.toUpperCase()) ||
                user.last_name.toUpperCase().startsWith(search.toUpperCase())
        )
        .filter((user) => companyMatched(user.company_name, filterbycompany))
        .map((user) => {
            return {
                id: user['uid'],
                userName: `${user['first_name']}, ${user['last_name']}`,
                companyName: user['company_name'],
                first_name: user['first_name'],
                last_name: user['last_name'],
            };
        });
    // sort on filtered Data
    const srtOptn = sortOptions[sortBy];
    const sortedData = filteredData.sort((u1, u2) => {
        const fld1 = u1[srtOptn.field].toUpperCase().trim();
        const fld2 = u2[srtOptn.field].toUpperCase().trim();
        let retVal = 0;
        if (fld1 < fld2) {
            retVal = -1;
        }
        if (fld1 > fld2) {
            retVal = 1;
        }

        // names must be equal
        return srtOptn.asc ? retVal : -retVal;
    });
    const finalData = sortedData.slice(start, end);
    return {
        headers,
        users: finalData,
        totalCount: filteredData.length,
        companies: Array.from(companySet),
        sortOptions,
    };
}

module.exports.getAllUsers = getAllUsers;
