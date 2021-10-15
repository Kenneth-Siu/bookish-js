const passport = require("passport");
const passportJwt = require("passport-jwt");
const accountRepository = require("./repositories/accountRepository");
const config = require("./config");

const options = {
    jwtFromRequest: passportJwt.ExtractJwt.fromHeader("x-access-token"),
    secretOrKey: config.secret,
};

passport.use(
    new passportJwt.Strategy(options, function (decodedJwt, next) {
        const username = decodedJwt.username;

        accountRepository
            .doesUsernameExist(username)
            .then((exists) => {
                if (exists) {
                    next(null, username);
                } else {
                    next(null, false);
                }
            })
            .catch(function (error) {
                next(error, false);
                console.error(error);
            });
    })
);

module.exports = passport.initialize();