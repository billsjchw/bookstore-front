import service from '@/services/service';

function findBookById(id, callback) {
  service.get('/book/find-book-by-id', { 'id': id }, callback);
}

function findAllBooks(page, size, callback) {
  service.get('/book/find-all-books', { 'page': page, 'size': size }, callback);
}

function bookFuzzySearch(keyword, page, size, callback) {
  service.get('/book/book-fuzzy-search', { 'keyword': keyword, 'page': page, 'size': size }, callback);
}

export default {findBookById, findAllBooks, bookFuzzySearch};
