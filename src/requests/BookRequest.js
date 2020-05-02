import Ajax from "@/util/Ajax";
import Backend from "@/constants/Backend";

const BookRequest = {
    findAllBooks(callback) {
        Ajax.get(`${Backend.DOMAIN}/book/find-all-books`, callback);
    },
    addBook(book, callback) {
        Ajax.post(`${Backend.DOMAIN}/book/add-book`, book, callback);
    }
};

export default BookRequest;
