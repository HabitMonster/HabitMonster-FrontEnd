import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();

export const setCookie = (name, value) => {
  return cookies.set(name, value, {
    path: '/',
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};
