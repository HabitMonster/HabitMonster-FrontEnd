import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const instance = axios.create({ baseURL });

const setToken = (config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Credentials'] = true;

  config.headers['A-AUTH-TOKEN'] =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0RyIsInR5cGUiOiJHb29nbGUiLCJpYXQiOjE2MzU4NTMwOTcsImV4cCI6MTYzODQ0NTA5N30.GpfcpSPoppzF8HBgIIxk1n2zd0JTu7yv8-oPJgjkmQI';
  config.headers.withCredentials = true;
  return config;
};

instance.interceptors.request.use(setToken);

export default instance;
