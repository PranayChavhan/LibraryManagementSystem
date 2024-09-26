import { Book } from '../models/Book';

export class LibraryService {
  private books: Book[] = [];

  addBook(book: Book): void {
    if (this.books.some(b => b.isbn === book.isbn)) {
      throw new Error('Book with this ISBN already exists');
    }
    this.books.push(book);
  }

  borrowBook(isbn: string): void {
    const book = this.books.find(b => b.isbn === isbn);
    if (!book) {
      throw new Error('Book not found');
    }
    if (!book.isAvailable) {
      throw new Error('Book is not available');
    }
    book.isAvailable = false;
  }

  returnBook(isbn: string): void {
    const book = this.books.find(b => b.isbn === isbn);
    if (!book) {
      throw new Error('Book not found');
    }
    if (book.isAvailable) {
      throw new Error('Book is already available');
    }
    book.isAvailable = true;
  }

  getAvailableBooks(): Book[] {
    return this.books.filter(book => book.isAvailable);
  }
}