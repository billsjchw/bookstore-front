import service from '@/services/service';

function findBookById(id, callback) {
  let params = { 'id': id };
  service.get('/book/find-book-by-id', params, callback);
}

function findAllBooks(page, size, callback) {
  let params = { 'page': page, 'size': size };
  service.get('/book/find-all-books', params, callback);
}

function bookFuzzySearch(keyword, page, size, callback) {
  let params = { 'keyword': keyword, 'page': page, 'size': size };
  service.get('/book/book-fuzzy-search', params, callback);
}

function addBook(book, callback) {
  service.post('/book/add-book', null, book, callback);
}

function editBook(book, callback) {
  service.post('/book/edit-book', null, book, callback);
}

function deleteBookById(id, callback) {
  let params = { 'id': id };
  service.get('/book/delete-book-by-id', params, callback);
}

export default {findBookById, findAllBooks, bookFuzzySearch, addBook, editBook, deleteBookById};
