const accountRepository = require("../repositories/accountRepository");
const jwt = require("jsonwebtoken");
const config = require("../config");

function getJwtForUser(username, password) {
    return accountRepository.doesUsernameAndPasswordExist(username, password).then((exists) => {
        if (exists) {
            return createTokenForUser(username);
        }
        return null;
    });
}

function createTokenForUser(username) {
    return jwt.sign({ username: username }, config.secret);
}

module.exports = { getJwtForUser: getJwtForUser };
