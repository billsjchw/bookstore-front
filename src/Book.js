class Book {
    constructor(book) {
        if (book !== undefined) {
            this.isbn = book.isbn;
            this.title = book.title;
            this.author = book.author;
            this.price = book.price;
            this.press = book.press;
            this.date = book.date;
            this.language = book.language;
            this.stock = book.stock;
            this.introduction = book.introduction;
        } else {
            this.isbn = "";
            this.title = "";
            this.author = "";
            this.price = 0;
            this.press = "";
            this.date = "1970-01-01";
            this.language = "";
            this.stock = 0;
            this.introduction = "";
        }
    }
}

export default Book;
