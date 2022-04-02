const FIRST_BOOK_INDEX = 10;
const LAST_BOOK_INDEX = 20;

export default class Library {
  constructor(books, categories, authors) {
    this.books = books;
    this.categories = categories;
    this.authors = authors;
  }

  getBook(bookID, options) {
    if (bookID < FIRST_BOOK_INDEX) {
      return {};
    }

    if (bookID > LAST_BOOK_INDEX) {
      return { book: this.books[this.books.length - 1] };
    }

    return {
      name: this.books[bookID].name,
      price: this.books[bookID].price,
      hasCategory: options.hasCategory,
      hasAuthor:
        this.authors.books[bookID] !== undefined ? true : options.hasAuthor,
    };
  }

  getCategory(bookID) {
    const category = this.findCategory(this.books[bookID].categoryId);

    return category ? { id: `category_${category}` } : {};
  }

  findCategory(categoryID) {
    return this.categories.find((category) => {
      const isSearchedCategory =
        category.id === categoryID ||
        (category.hasBooks === true && category.booksType === 'main');

      return isSearchedCategory ? category : {};
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showMessage(message) {
    console.log(message);
  }
}
