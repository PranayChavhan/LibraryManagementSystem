import { LibraryService } from './services/LibraryService';
import { Book } from './models/Book';
import * as readline from 'node:readline';

const library = new LibraryService();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('\n--- Library Management System ---');
  console.log('1. Add a book');
  console.log('2. Borrow a book');
  console.log('3. Return a book');
  console.log('4. View available books');
  console.log('5. Exit');
  rl.question('Enter your choice (1-5): ', handleChoice);
}

function handleChoice(choice: string) {
  switch (choice) {
    case '1':
      addBook();
      break;
    case '2':
      borrowBook();
      break;
    case '3':
      returnBook();
      break;
    case '4':
      viewAvailableBooks();
      break;
    case '5':
      rl.close();
      return;
    default:
      console.log('Invalid choice. Please try again.');
      displayMenu();
  }
}

function addBook() {
  rl.question('Enter ISBN: ', (isbn) => {
    rl.question('Enter title: ', (title) => {
      rl.question('Enter author: ', (author) => {
        rl.question('Enter publication year: ', (yearStr) => {
          const year = parseInt(yearStr);
          if (isNaN(year)) {
            console.log('Invalid year. Book not added.');
            displayMenu();
            return;
          }
          const newBook = new Book(isbn, title, author, year);
          try {
            library.addBook(newBook);
            console.log('Book added successfully!');
          } catch (error) {
            console.log('Error:', error instanceof Error ? error.message : String(error));
          }
          displayMenu();
        });
      });
    });
  });
}

function borrowBook() {
  rl.question('Enter ISBN of the book to borrow: ', (isbn) => {
    try {
      library.borrowBook(isbn);
      console.log('Book borrowed successfully!');
    } catch (error) {
      console.log('Error:', error instanceof Error ? error.message : String(error));
    }
    displayMenu();
  });
}

function returnBook() {
  rl.question('Enter ISBN of the book to return: ', (isbn) => {
    try {
      library.returnBook(isbn);
      console.log('Book returned successfully!');
    } catch (error) {
      console.log('Error:', error instanceof Error ? error.message : String(error));
    }
    displayMenu();
  });
}

function viewAvailableBooks() {
  const availableBooks = library.getAvailableBooks();
  if (availableBooks.length === 0) {
    console.log('No books available.');
  } else {
    console.log('Available books:');
    availableBooks.forEach((book, index) => {
      console.log(`${index + 1}. ISBN: ${book.isbn}, Title: ${book.title}, Author: ${book.author}, Year: ${book.publicationYear}`);
    });
  }
  displayMenu();
}

console.log('Welcome to the Library Management System!');
displayMenu();

rl.on('close', () => {
  console.log('Thank you for using the Library Management System. Goodbye!');
  process.exit(0);
});