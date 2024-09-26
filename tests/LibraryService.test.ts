import { LibraryService } from '../src/services/LibraryService';
import { Book } from '../src/models/Book';


describe('LibraryService', () => {
    let library: LibraryService;

    beforeEach(() => {
        library = new LibraryService();
    });

    test('addBook should add a book to the library', () => {
        const book = new Book('1234567890', 'Test Book', 'Test Author', 2023);
        library.addBook(book);
        expect(library.getAvailableBooks()).toContainEqual(book);
    });

    test('addBook should throw an error if book with same ISBN already exists', () => {
        const book1 = new Book('1234567890', 'Test Book 1', 'Test Author 1', 2023);
        const book2 = new Book('1234567890', 'Test Book 2', 'Test Author 2', 2024);
        library.addBook(book1);
        expect(() => library.addBook(book2)).toThrow('Book with this ISBN already exists');
    });

    test('borrowBook should make a book unavailable', () => {
        const book = new Book('1234567890', 'Test Book', 'Test Author', 2023);
        library.addBook(book);
        library.borrowBook('1234567890');
        expect(library.getAvailableBooks()).not.toContainEqual(book);
    });

    test('borrowBook should throw an error if book is not found', () => {
        expect(() => library.borrowBook('nonexistent')).toThrow('Book not found');
    });

    test('borrowBook should throw an error if book is not available', () => {
        const book = new Book('1234567890', 'Test Book', 'Test Author', 2023);
        library.addBook(book);
        library.borrowBook('1234567890');
        expect(() => library.borrowBook('1234567890')).toThrow('Book is not available');
    });

    test('returnBook should make a book available', () => {
        const book = new Book('1234567890', 'Test Book', 'Test Author', 2023);
        library.addBook(book);
        library.borrowBook('1234567890');
        library.returnBook('1234567890');
        expect(library.getAvailableBooks()).toContainEqual(book);
    });

    test('returnBook should throw an error if book is not found', () => {
        expect(() => library.returnBook('nonexistent')).toThrow('Book not found');
    });

    test('returnBook should throw an error if book is already available', () => {
        const book = new Book('1234567890', 'Test Book', 'Test Author', 2023);
        library.addBook(book);
        expect(() => library.returnBook('1234567890')).toThrow('Book is already available');
    });

    test('getAvailableBooks should return only available books', () => {
        const book1 = new Book('1234567890', 'Test Book 1', 'Test Author 1', 2023);
        const book2 = new Book('0987654321', 'Test Book 2', 'Test Author 2', 2024);
        library.addBook(book1);
        library.addBook(book2);
        library.borrowBook('1234567890');
        expect(library.getAvailableBooks()).toEqual([book2]);
    });
});