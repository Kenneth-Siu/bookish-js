const express = require("express");
const passport = require("passport");
const passportJwt = require("passport-jwt");

const accountRepository = require("./repositories/accountRepository");

const bookController = require("./controllers/bookController");
const loginController = require("./controllers/loginController");
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

const app = express();

app.use(passport.initialize());

app.use("/books", bookController);
app.use("/login", loginController);

app.listen(3000, () => {
    console.log("Bookish is listening on port 3000");
});
