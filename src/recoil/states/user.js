import { atom, selector } from 'recoil';
import { mainApis } from '../../api';

const asyncDefaultUserState = selector({
  key: 'asyncDefaultUser',
  get: async () => {
    try {
      const { data } = await mainApis.getUserInfo();
      return data.userInfo;
    } catch (error) {
      throw error;
    }
  },
});

export const userState = atom({
  key: 'user',
  default: asyncDefaultUserState,
});
