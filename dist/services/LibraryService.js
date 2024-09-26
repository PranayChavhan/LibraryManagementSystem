"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryService = void 0;
class LibraryService {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        if (this.books.some(b => b.isbn === book.isbn)) {
            throw new Error('Book with this ISBN already exists');
        }
        this.books.push(book);
    }
    borrowBook(isbn) {
        const book = this.books.find(b => b.isbn === isbn);
        if (!book) {
            throw new Error('Book not found');
        }
        if (!book.isAvailable) {
            throw new Error('Book is not available');
        }
        book.isAvailable = false;
    }
    returnBook(isbn) {
        const book = this.books.find(b => b.isbn === isbn);
        if (!book) {
            throw new Error('Book not found');
        }
        if (book.isAvailable) {
            throw new Error('Book is already available');
        }
        book.isAvailable = true;
    }
    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable);
    }
}
exports.LibraryService = LibraryService;
