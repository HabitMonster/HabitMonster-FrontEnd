import { atom, selector, selectorFamily } from 'recoil';

import { myPageApis } from '../../api';

import { OK } from '../../constants/statusCode';

export const userState = atom({
  key: 'userState',
  default: {},
});

export const currentUserConnectionDayState = atom({
  key: 'currentUserConnectionDayState',
  default: new Date().getDay(),
});

export const currentUserMonsterCodeSelector = selector({
  key: 'currentUserMonsterCodeSelector',
  get: ({ get }) => get(userState).monsterCode,
});

export const followerListRefetchToggler = atom({
  key: 'followerListRefetchToggler',
  default: 0,
});

export const followingListRefetchToggler = atom({
  key: 'followingListRefetchToggler',
  default: 0,
});

export const currentUserFollowerListSelector = selector({
  key: 'currentUserFollowerListSelector',
  get: async ({ get }) => {
    get(followerListRefetchToggler);
    try {
      const { data } = await myPageApis.getFollowerList();
      if (data.statusCode === OK) {
        return data?.followers;
      }
    } catch (error) {
      console.error('myFollowerList error', error);
    }
  },
});
export const currentUserFollowingListSelector = selector({
  key: 'currentUserFollowingListSelector',
  get: async ({ get }) => {
    get(followingListRefetchToggler);
    try {
      const { data } = await myPageApis.getFollowingList();
      return data?.followings;
    } catch (error) {
      console.error('myFollowing error', error);
    }
  },
});

export const myFollowListCountSelector = selector({
  key: 'myFollowListCountSelector',
  get: ({ get }) => {
    return {
      followerListCount: get(currentUserFollowerListSelector).length,
      followingListCount: get(currentUserFollowingListSelector).length,
    };
  },
});

export const myFollowListByType = selectorFamily({
  key: 'myFollowListByType',
  get:
    (type) =>
    ({ get }) => {
      get(followerListRefetchToggler);
      get(followingListRefetchToggler);
      switch (type) {
        case 'followers':
          return get(currentUserFollowerListSelector);
        case 'following':
          return get(currentUserFollowingListSelector);
        default:
          throw new Error(`셀렉터 타입이 올바르지 않음. ${type}`);
      }
    },
  set:
    (type) =>
    ({ set }, newType) => {
      const refetchType = newType ?? type;
      switch (refetchType) {
        case 'followers':
          set(followerListRefetchToggler, (v) => v + 1);
          break;
        case 'following':
          set(followingListRefetchToggler, (v) => v + 1);
          break;
        default:
          set(followerListRefetchToggler, (v) => v + 1);
          set(followingListRefetchToggler, (v) => v + 1);
          break;
      }
    },
});
