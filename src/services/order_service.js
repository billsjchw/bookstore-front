import service from '@/services/service';

function orderItemsInMyCart(consignee, paymentMethod, callback) {
  let body = { 'consignee': consignee, 'paymentMethod': paymentMethod };
  service.post('/order/order-items-in-my-cart', null, body, callback);
}

function orderSearch(timePlacedStart, timePlacedEnd, page, size, callback) {
  let params = {
    'time-placed-start': timePlacedStart,
    'time-placed-end': timePlacedEnd,
    'page': page,
    'size': size,
  };
  service.get('/order/order-search', params, callback);
}

function orderFuzzySearch(keyword, timePlacedStart, timePlacedEnd, page, size, callback) {
  let params = {
    'keyword': keyword,
    'time-placed-start': timePlacedStart,
    'time-placed-end': timePlacedEnd,
    'page': page,
    'size': size,
  };
  service.get('/order/order-fuzzy-search', params, callback);
}

function myOrderSearch(timePlacedStart, timePlacedEnd, page, size, callback) {
  let params = {
    'time-placed-start': timePlacedStart,
    'time-placed-end': timePlacedEnd,
    'page': page,
    'size': size,
  };
  service.get('/order/my-order-search', params, callback);
}

function myOrderFuzzySearch(keyword, timePlacedStart, timePlacedEnd, page, size, callback) {
  let params = {
    'keyword': keyword,
    'time-placed-start': timePlacedStart,
    'time-placed-end': timePlacedEnd,
    'page': page,
    'size': size,
  };
  service.get('/order/my-order-fuzzy-search', params, callback);
}

export default {orderItemsInMyCart, orderSearch, orderFuzzySearch, myOrderSearch, myOrderFuzzySearch};
