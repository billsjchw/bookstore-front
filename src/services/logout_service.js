import service from '@/services/service';

function logout(callback) {
  service.get('/logout', null, callback);
}

export default {logout};
