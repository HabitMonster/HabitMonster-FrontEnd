import { deleteCookie, getCookie } from './cookie';

export const setMoveToLoginPage = () => {
  if (getCookie('G_AUTHUSER_H')) {
    deleteCookie('G_AUTHUSER_H');
  }
  deleteCookie('habit-A-Token');
  deleteCookie('habit-R-Token');
  window.location.href = '/login';
};
