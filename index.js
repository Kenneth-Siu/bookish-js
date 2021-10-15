const express = require("express");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const jwt = require("jsonwebtoken");

const bookRepository = require("./repositories/bookRepository");
const accountRepository = require("./repositories/accountRepository");

const secret = "secret";

const options = {
    jwtFromRequest: passportJwt.ExtractJwt.fromHeader("x-access-token"),
    secretOrKey: secret,
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

app.get("/books", passport.authenticate("jwt", { session: false }), (request, response) => {
    bookRepository
        .getAllBooks()
        .then(function (books) {
            response.send(books);
        })
        .catch(function (error) {
            response.status(500);
            console.error(error);
        });
});

app.get("/login", (request, response) => {
    const username = request.query.username;
    const password = request.query.password;

    accountRepository
        .canUserLogin(username, password)
        .then((ableToLogin) => {
            if (ableToLogin) {
                response.send({
                    message: `Hello, ${username}`,
                    token: createTokenForUser(username),
                });
            } else {
                response.status(400).send({
                    errors: "Nope, your combination of username and password is wrong",
                });
            }
        })
        .catch(function (error) {
            response.status(500);
            console.error(error);
        });
});

function createTokenForUser(username) {
    return jwt.sign({ username: username }, secret);
}

app.listen(3000, () => {
    console.log("Bookish is listening on port 3000");
});
