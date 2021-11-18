import { atom, selector } from 'recoil';
import { mainApis } from '../../api';

export const authState = atom({
  key: 'authState',
  default: selector({
    key: 'asyncAuth',
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
  }),
});
