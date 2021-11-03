import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://3.35.218.192/',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
  withCredentials: true,
});

export default instance;
