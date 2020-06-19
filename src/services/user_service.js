import service from '@/services/service';

function register(user, callback) {
  service.post('/user/register', null, user, callback);
}

function findAllUsers(page, size, callback) {
  let params = { 'page': page, 'size': size };
  service.get('/user/find-all-users', params, callback);
}

function userFuzzySearch(keyword, page, size, callback) {
  let params = { 'keyword': keyword, 'page': page, 'size': size };
  service.get('/user/user-fuzzy-search', params, callback);
}

function setUserEnabled(userId, enabled, callback) {
  let params = { 'user-id': userId, 'enabled': enabled };
  service.get('user/set-user-enabled', params, callback);
}

export default {register, findAllUsers, userFuzzySearch, setUserEnabled};
