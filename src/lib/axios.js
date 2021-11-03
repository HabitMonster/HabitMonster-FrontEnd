import axios from 'axios';
import { getCookie } from '../utils/cookie';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export default instance;
