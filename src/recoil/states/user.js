import { atom, selector, selectorFamily } from 'recoil';
import { mainApis } from '../../api';
import { myPageApis } from '../../api';

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

//@jaekyung Mypage api

const userDataSelector = selector({
  key: 'userData',
  get: async () => {
    try {
      const { data } = await myPageApis.getUserInfo();
      console.log('userInfo', data, data.userInfo);
      return data.userInfo;
    } catch (error) {
      throw error;
    }
  },
});

export const userData = atom({
  key: 'myPageData',
  default: userDataSelector,
});

export const updateUserSelector = selectorFamily({
  key: 'updateUser',
  get: (userName) => async () => {
    if (!userName) return null;

    const { data } = await myPageApis.editUserName(userName);
    console.log('updateUser', data);
    return data;
  },
});
