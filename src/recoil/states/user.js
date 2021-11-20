import { atom, selector, selectorFamily } from 'recoil';
import { userApis, mainApis, myPageApis } from '../../api';

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

const myPageDataSelector = selector({
  key: 'myPageDataSelector',
  get: async () => {
    try {
      const { data } = await myPageApis.loadUserData();
      return data.userInfo;
    } catch (error) {
      throw error;
    }
  },
});

export const myPageDataState = atom({
  key: 'myPageData',
  default: myPageDataSelector,
});

// 안쓰는 셀렉터
export const updateUserSelector = selectorFamily({
  key: 'updateUser',
  get: (userName) => async () => {
    // 신경써주세용!
    if (!userName) {
      return null;
    }

    const { data } = await myPageApis.editUserName(userName);
    return data;
  },
});

const followerDataSelector = selector({
  key: 'followerDataSelector',
  get: async () => {
    try {
      const { data } = await userApis.loadFollowers();
      return data.followers;
    } catch (error) {
      throw error;
    }
  },
});

export const followerDataState = atom({
  key: 'followerDataState',
  default: followerDataSelector,
});

const followingDataSelector = selector({
  key: 'followingDataSelector',
  get: async () => {
    try {
      const { data } = await userApis.loadFollowings();
      return data.followings;
    } catch (error) {
      throw error;
    }
  },
});

export const followingDataState = atom({
  key: 'followingDataState',
  default: followingDataSelector,
});
