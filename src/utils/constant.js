const Backend = {
  BASE_URL: 'http://localhost:8080',
};

const HttpStatus = {
  OK: 200,
  UNAUTHORIZED: 401,
};

const AuthorityId = {
  BOOK_ADMIN: 1,
  USER_ADMIN: 2,
  ORDER_ADMIN: 3,
};

export default {Backend, HttpStatus, AuthorityId};
