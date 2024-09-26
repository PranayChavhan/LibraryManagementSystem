export class Book {
    constructor(
      public isbn: string,
      public title: string,
      public author: string,
      public publicationYear: number,
      public isAvailable: boolean = true
    ) {}
  }