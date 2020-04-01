class Book {
    constructor(book) {
        this.isbn = book.isbn;
        this.title = book.title;
        this.author = book.author;
        this.price = Number(book.price);
        this.press = book.press;
        this.date = book.date;
        this.lang = book.lang;
        this.stock = Number(book.stock);
        this.intro = book.intro;
    }
}

export default Book;
