import { removeCookie } from './cookie';

export const setMoveToLoginPage = () => {
  removeCookie('habit-A-Token');
  removeCookie('habit-R-Token');
  window.location.href = '/login';
};
