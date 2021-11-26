import { atom, selector } from 'recoil';
import { mainApis } from '../../api';

export const authToggler = atom({
  key: 'authToggler',
  default: 1,
});

export const defaultAuthSelector = selector({
  key: 'defaultAuthSelector',
  get: async () => {
    const loginStatus = {
      isLogin: false,
      isFirstLogin: null,
      createdAt: '',
    };

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
