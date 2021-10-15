const bookRepository = require("../repositories/bookRepository");

function getAllBooks() {
    return bookRepository.getAllBooks();
}

function getBook(id) {
    return bookRepository.getBook(id);
}

module.exports = {
    getAllBooks: getAllBooks,
    getBook: getBook,
};
