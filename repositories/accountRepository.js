const db = require("./db");

function doesUsernameExist(username) {
    return db.any("SELECT * FROM Account WHERE username = $1", [username]).then((accounts) => {
        return accounts.length > 0;
    });
}

function doesUsernameAndPasswordExist(username, password) {
    return db
        .any(`SELECT * FROM Account WHERE username = $1 AND password = $2`, [username, password])
        .then((accounts) => {
            return accounts.length > 0;
        });
}

module.exports = {
    doesUsernameExist: doesUsernameExist,
    doesUsernameAndPasswordExist: doesUsernameAndPasswordExist,
};
