import service from '@/services/service';

function findTopSellers(n, timePlacedStart, timePlacedEnd, callback) {
  let params = {
    'n': n,
    'time-placed-start': timePlacedStart,
    'time-placed-end': timePlacedEnd,
  };
  service.get('/stat/find-top-sellers', params, callback);
}

function findTopConsumers(n, timePlacedStart, timePlacedEnd, callback) {
  let params = {
    'n': n,
    'time-placed-start': timePlacedStart,
    'time-placed-end': timePlacedEnd,
  };
  service.get('/stat/find-top-consumers', params, callback);
}

function calcMyPersonalStat(timePlacedStart, timePlacedEnd, callback) {
  let params = {
    'time-placed-start': timePlacedStart,
    'time-placed-end': timePlacedEnd,
  };
  service.get('/stat/calc-my-personal-stat', params, callback);
}

export default {findTopSellers, findTopConsumers, calcMyPersonalStat};
