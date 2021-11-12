import { atom, selector } from 'recoil';
import { getCookie } from '../../utils/cookie';
import { auth } from '../../api';

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

    // const accessToken = getCookie('accessToken');
    const accessToken = window.localStorage.getItem('habitAccess');
    console.log('before');
    console.log('accessToken: ', accessToken);
    if (!accessToken) {
      return loginStatus;
    }

    console.log('after');

    try {
      const { data } = await auth.check();
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
