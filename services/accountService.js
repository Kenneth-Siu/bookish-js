const accountRepository = require("../repositories/accountRepository");

function getJwtForUser(username, password) {
    return accountRepository
        .doesUsernameAndPasswordExist(username, password)
        .then((exists) => {
            if (exists) {
                return createTokenForUser(username);
            }
            return null;
        });
}

function createTokenForUser(username) {
    return jwt.sign({ username: username }, secret);
}

module.exports = { getJwtForUser: getJwtForUser };
