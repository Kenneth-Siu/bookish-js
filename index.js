const express = require("express");
const pgp = require("pg-promise")();
const connectionString = require("./config.js");

const db = pgp(connectionString);

const app = express();

app.get("/books", (req, res) => {
    db.any("SELECT * FROM book")
        .then(function (data) {
            res.send(data);
        })
        .catch(function (error) {
            res.status(500);
            console.error(error);
        });
});

app.listen(3000, () => {
    console.log("Bookish is listening on port 3000");
});
