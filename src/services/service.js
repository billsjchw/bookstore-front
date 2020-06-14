import axios from 'axios';
import constant from '@/utils/constant';

function get(url, params, callback) {
  let basic = sessionStorage.getItem('basic');
  if (!basic) {
    callback({ status: "UNAUTHORIZED", data: null });
    return;
  }
  axios.get(url, {
    baseURL: constant.Backend.BASE_URL,
    headers: {
      "Authorization": `Basic ${basic}`,
    },
    params: params,
  }).then(resp => {
    callback(resp.data);
  }).catch(err => {
    if (err.response && err.response.status === constant.HttpStatus.UNAUTHORIZED)
      callback({ status: 'UNAUTHORIZED', data: null });
    else
      callback({ status: 'UNKNOWN_ERROR', data: err });
  });
}

function post(url, params, body, callback) {
  let basic = sessionStorage.getItem('basic');
  if (!basic) {
    callback({ status: "UNAUTHORIZED", data: null });
    return;
  }
  axios.post(url, body, {
    baseURL: constant.Backend.BASE_URL,
    headers: {
      "Authorization": `Basic ${basic}`,
    },
    params: params,
  }).then(resp => {
    callback(resp.data);
  }).catch(err => {
    if (err.response && err.response.status === constant.HttpStatus.UNAUTHORIZED)
      callback({ status: 'UNAUTHORIZED', data: null });
    else
      callback({ status: 'UNKNOWN_ERROR', data: err });
  });
}

export default {get, post};
