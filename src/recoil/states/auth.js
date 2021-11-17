import { atom, selector } from 'recoil';
import { mainApis } from '../../api';

export const asyncDefaultAuth = selector({
  key: 'asyncDefaultAuth',
  get: async () => {
    const loginStatus = {
      isLogin: false,
      isFirstLogin: null,
    };

    const accessToken = window.localStorage.getItem('habitAccessToken');

    if (!accessToken) {
      return loginStatus;
    }

    try {
      const { data } = await mainApis.checkLogin();
      loginStatus.isFirstLogin = data.isFirstLogin;
      loginStatus.isLogin = data.isLogin;

      return loginStatus;
    } catch (error) {
      console.error(error);
      return loginStatus;
    }
  },
});

export const authState = atom({
  key: 'authState',
  default: asyncDefaultAuth,
});
