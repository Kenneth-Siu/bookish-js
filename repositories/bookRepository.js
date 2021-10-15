const db = require("./db");

function getAllBooks() {
    return db.any("SELECT * FROM Book");
}

function getBook(id) {
    return db.any("SELECT * FROM Book WHERE id = $1", [id]).then((books) => {
        if (books.length > 0) {
            return books[0];
        } else {
            return null;
        }
    });
}

module.exports = {
    getAllBooks: getAllBooks,
    getBook: getBook,
};
