import axios from 'axios';
import constant from '@/utils/constant';

function get(url, params, callback) {
  let headers = {};
  let basic = sessionStorage.getItem('basic');
  if (basic !== null)
    headers['Authorization'] = `Basic ${basic}`;
  axios.get(url, {
    baseURL: constant.Backend.BASE_URL,
    headers: headers,
    params: params,
  }).then(resp => {
    callback(resp.data);
  }).catch(err => {
    if (err.response && err.response.status === constant.HttpStatus.UNAUTHORIZED)
      callback(err.response.data);
    else
      callback({ status: 'UNKNOWN_ERROR', data: err });
  });
}

function post(url, params, body, callback) {
  let headers = { 'Content-Type': 'application/json' };
  let basic = sessionStorage.getItem('basic');
  if (basic !== null)
    headers['Authorization'] = `Basic ${basic}`;
  axios.post(url, body, {
    baseURL: constant.Backend.BASE_URL,
    headers: headers,
    params: params,
  }).then(resp => {
    callback(resp.data);
  }).catch(err => {
    if (err.response && err.response.status === constant.HttpStatus.UNAUTHORIZED)
      callback(err.response.data);
    else
      callback({ status: 'UNKNOWN_ERROR', data: err });
  });
}

export default {get, post};
