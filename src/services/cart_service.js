import service from '@/services/service';

function addBookToMyCart(bookId, callback) {
  service.get('/add-book-to-my-cart', { 'book-id': bookId }, callback);
}

function findItemInMyCart(bookId, callback) {
  service.get('/find-item-in-my-cart', { 'book-id': bookId }, callback);
}

function findMyCart(callback) {
  service.get('/find-my-cart', null, callback);
}

function editItemInMyCart(cartItem, callback) {
  service.post('/edit-item-in-my-cart', null, cartItem, callback);
}

function removeItemFromMyCart(bookId, callback) {
  service.get('/remove-item-from-my-cart', { 'book-id': bookId }, callback);
}

export default {addBookToMyCart, findItemInMyCart, findMyCart, editItemInMyCart, removeItemFromMyCart};
