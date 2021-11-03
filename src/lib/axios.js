import axios from 'axios';
import { getCookie } from '../utils/cookie';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // 'A-AUTH-TOKEN':
    //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0RyIsInR5cGUiOiJHb29nbGUiLCJpYXQiOjE2MzU4NDk2ODcsImV4cCI6MTYzODQ0MTY4N30.IQ6lot-bnr0ldBevUIw2GgRLX5Er3IIBvpeqGXLiagQ',
    // 'A-AUTH-TOKEN': `${getCookie('accessToken')}`,
  },
});

export default instance;
