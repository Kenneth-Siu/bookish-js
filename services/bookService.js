const bookRepository = require("../repositories/bookRepository");

function getAllBooks() {
    return bookRepository.getAllBooks();
}

module.exports = { getAllBooks: getAllBooks };
