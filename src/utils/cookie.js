import {
  DAY_MILLISECS,
  HOUR_MILLISECS,
  MIN_MILLISECS,
  SECS_MILLISECS,
} from '../constants';

const getCookie = (name) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  } else if (parts === '; ') {
    return undefined;
  }
  return parts.pop().split('=')[1];
};

const setCookie = (name, value, exp = 5) => {
  const date = new Date();
  date.setTime(
    date.getTime() +
      exp * DAY_MILLISECS * HOUR_MILLISECS * MIN_MILLISECS * SECS_MILLISECS,
  );
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const deleteCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
};

export { getCookie, setCookie, deleteCookie };
