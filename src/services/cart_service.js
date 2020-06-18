import service from '@/services/service';

function addBookToMyCart(bookId, callback) {
  let params = { 'book-id': bookId };
  service.get('/cart/add-book-to-my-cart', params, callback);
}

function findItemInMyCart(bookId, callback) {
  let params = { 'book-id': bookId };
  service.get('/cart/find-item-in-my-cart', params, callback);
}

function findMyCart(callback) {
  service.get('/cart/find-my-cart', null, callback);
}

function editItemInMyCart(cartItem, callback) {
  service.post('/cart/edit-item-in-my-cart', null, cartItem, callback);
}

function removeItemFromMyCart(bookId, callback) {
  let params = { 'book-id': bookId };
  service.get('/cart/remove-item-from-my-cart', params, callback);
}

export default {addBookToMyCart, findItemInMyCart, findMyCart, editItemInMyCart, removeItemFromMyCart};
