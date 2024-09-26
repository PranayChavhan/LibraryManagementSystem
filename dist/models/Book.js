"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(isbn, title, author, publicationYear, isAvailable = true) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.isAvailable = isAvailable;
    }
}
exports.Book = Book;
