const db = require("./db");

function getAllBooks() {
    return db.any("SELECT * FROM Book");
}

module.exports = {
    getAllBooks: getAllBooks,
};
