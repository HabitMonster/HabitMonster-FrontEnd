import axios from 'axios';

import {
  BAD_REQUEST,
  OK,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from '../constants/statusCode';
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SIGNATURE_EXCEPTION,
  ACCESS_TOKEN_MALFORMED,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SIGNATURE_EXCEPTION,
  REFRESH_TOKEN_MALFORMED,
} from '../constants/statusMessage';
import { setMoveToLoginPage } from '../utils/setMoveToLoginPage';

const baseURL = process.env.REACT_APP_BASE_URL;
const instance = axios.create({ baseURL });

const setToken = (config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Credentials'] = true;
  config.headers['A-AUTH-TOKEN'] =
    window.localStorage.getItem('habitAccessToken');
  config.headers.withCredentials = true;
  return config;
};

instance.interceptors.request.use(setToken);

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const { data: responseData, config: originalRequest } = error.response;
    if (responseData.status === INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'development') {
        console.log(responseData);
      }
      setMoveToLoginPage();
      return Promise.reject(error);
    }

    if (responseData.statusCode === UNAUTHORIZED) {
      if (responseData.responseMessage === ACCESS_TOKEN_SIGNATURE_EXCEPTION) {
        if (process.env.NODE_ENV === 'development') {
          console.log(responseData);
        }
        setMoveToLoginPage();
        return Promise.reject(error);
      }

      if (responseData.responseMessage === ACCESS_TOKEN_MALFORMED) {
        if (process.env.NODE_ENV === 'development') {
          console.log(responseData);
        }
        setMoveToLoginPage();
        return Promise.reject(error);
      }
    }

    if (
      responseData.statusCode === BAD_REQUEST &&
      responseData.responseMessage === ACCESS_TOKEN_EXPIRED
    ) {
      if (process.env.NODE_ENV === 'development') {
        console.log(responseData);
      }

      try {
        const { data } = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_BASE_URL}user/loginCheck`,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'R-AUTH-TOKEN': `${window.localStorage.getItem(
              'habitRefreshToken',
            )}`,
          },
        });

        if (data.statusCode === OK) {
          window.localStorage.setItem('habitAccessToken', data.accessToken);
          originalRequest.headers['A-AUTH-TOKEN'] = `${data.accessToken}`;
          return axios(originalRequest);
        }
      } catch (error) {
        console.error(error);
        if (
          error?.response?.data?.statusCode === BAD_REQUEST &&
          error?.response?.data?.responseMessage === REFRESH_TOKEN_EXPIRED
        ) {
          if (process.env.NODE_ENV === 'development') {
            console.log(error.response);
          }
          setMoveToLoginPage();
          return Promise.reject(error);
        }
        if (error?.response?.data?.statusCode === UNAUTHORIZED) {
          if (
            error?.response?.data?.responseMessage ===
            REFRESH_TOKEN_SIGNATURE_EXCEPTION
          ) {
            setMoveToLoginPage();
            return Promise.reject(error);
          }
          if (
            error?.response?.data?.responseMessage === REFRESH_TOKEN_MALFORMED
          ) {
            if (process.env.NODE_ENV === 'development') {
              console.log(error);
            }
            setMoveToLoginPage();
            return Promise.reject(error);
          }
        }
        if (process.env.NODE_ENV === 'development') {
          console.log(error.response.data);
          setMoveToLoginPage();
        }
        return Promise.reject(error);
      }
    }

    if (error.response.data.statusCode === NOT_FOUND) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error.response.data);
      }
      return Promise.reject(error);
    }

    if (error.response.data.statusCode === INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error.response.data);
      }
      setMoveToLoginPage();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default instance;
