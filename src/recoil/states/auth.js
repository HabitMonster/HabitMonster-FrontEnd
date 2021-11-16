import { atom, selector } from 'recoil';
import { mainApis } from '../../api';

export const loginState = atom({
  key: 'loginState',
  default: {
    isFirstLogin: false,
  },
});

export const asyncDefaultAuth = selector({
  key: 'asyncDefaultAuth',
  get: async () => {
    const loginStatus = {};

    const accessToken = window.localStorage.getItem('habitAccessToken');
    if (!accessToken) {
      return loginStatus;
    }

    try {
      const { data } = await mainApis.checkLogin();
      loginStatus.isFirstLogin = data.isFirstLogin;
      loginStatus.isLogin = data.isLogin;
      loginStatus.createdAt = data.createdAt;

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
