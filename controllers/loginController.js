const express = require("express");
const accountService = require("../services/accountService");

const router = express.Router();

router.get("/", (request, response) => {
    const username = request.query.username;
    const password = request.query.password;

    accountService
        .getJwtForUser(username, password)
        .then((token) => {
            if (token) {
                response.send({
                    message: `Hello, ${username}`,
                    token: token,
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

module.exports = router;
