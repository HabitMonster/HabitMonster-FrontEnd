import { selector } from 'recoil';
import { mainApis } from '../../api';
import { getCookie } from '../../utils/cookie';

export const defaultAuthSelector = selector({
  key: 'defaultAuthSelector',
  get: async () => {
    const loginStatus = {
      isLogin: false,
      isFirstLogin: null,
      createdAt: '',
    };

    const accessToken = getCookie('habit-A-Token');

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
