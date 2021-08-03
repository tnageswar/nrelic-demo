const data = require('../database/data.json');

function getAllUsers() {
    return data.map((user) => {
        return {
            first_name: user['first_name'],
            last_name: user['last_name'],
            company_name: user['company_name'],
        };
    });
}

module.exports.getAllUsers = getAllUsers;
