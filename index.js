const express = require("express");
const pgp = require("pg-promise")();
const connectionString = require("./config.js");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const jwt = require("jsonwebtoken");

const secret = "secret";

const options = {
    jwtFromRequest: passportJwt.ExtractJwt.fromHeader("x-access-token"),
    secretOrKey: secret,
};

passport.use(
    new passportJwt.Strategy(options, function (decodedJwt, next) {
        const username = decodedJwt.username;

        db.any("SELECT * FROM Account")
            .then(function (data) {
                const account = data.find((account) => account.username === username);
                if (account !== undefined) {
                    next(null, account);
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

const db = pgp(connectionString);

const app = express();

app.get("/books", (request, response) => {
    db.any("SELECT * FROM Book")
        .then(function (data) {
            response.send(data);
        })
        .catch(function (error) {
            response.status(500);
            console.error(error);
        });
});

app.get("/login", (request, response) => {
    const username = request.query.username;
    const password = request.query.password;

    db.any("SELECT * FROM Account")
        .then(function (data) {
            const account = data.find(
                (account) => account.username === username && account.password === password
            );
            if (account !== undefined) {
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
