import Ajax from "@/util/Ajax";
import Backend from "@/constants/Backend";

const BookRequest = {
    addBook(book, callback) {
        Ajax.post(`${Backend.DOMAIN}/book/add-book`, book, callback);
    }
}

export default BookRequest;
