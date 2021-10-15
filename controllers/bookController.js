const express = require("express");
const passport = require("passport");
const bookService = require("../services/bookService");

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), (request, response) => {
    bookService
        .getAllBooks()
        .then(function (books) {
            response.send(books);
        })
        .catch(function (error) {
            response.status(500);
            console.error(error);
        });
});

router.get("/:id", passport.authenticate("jwt", { session: false }), (request, response) => {
    bookService
        .getBook(request.params.id)
        .then((book) => {
            if (book) {
                response.send(book);
            } else {
                response.status(404).send("No book");
            }
        })
        .catch(function (error) {
            response.status(500);
            console.error(error);
        });
});

module.exports = router;
