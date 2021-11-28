import { atom, selector, selectorFamily } from 'recoil';
import { myPageApis } from '../../api';

export const userState = atom({
  key: 'user',
  default: {},
});

export const currentUserMonsterCodeSelector = selector({
  key: 'currentUserMonsterCode',
  get: ({ get }) => get(userState)?.monsterCode,
});

export const followerListRefetchToggler = atom({
  key: 'followerListRefetchToggler',
  default: 0,
});

export const followingListRefetchToggler = atom({
  key: 'followingListRefetchToggler',
  default: 0,
});

export const myFollowerListState = atom({
  key: 'myFollowerListState',
  default: selector({
    key: 'myFollowerListSelector',
    get: async ({ get }) => {
      get(followerListRefetchToggler);
      try {
        const { data } = await myPageApis.getFollowerList();
        return data?.followers ?? [];
      } catch (error) {
        console.error('myFollowerList error', error);
      }
    },
  }),
});

export const myFollowingListState = atom({
  key: 'myFollowingListState',
  default: selector({
    key: 'myFollowingListSelector',
    get: async ({ get }) => {
      get(followingListRefetchToggler);
      try {
        const { data } = await myPageApis.getFollowingList();
        return data?.followings ?? [];
      } catch (error) {
        console.error('myFollowing error', error);
        return [];
      }
    },
  }),
});

export const myFollowListCountSelector = selector({
  key: 'myFollowListCountSelector',
  get: ({ get }) => {
    return {
      followerListCount: get(myFollowerListState)?.length ?? 0,
      followingListCount: get(myFollowingListState)?.length ?? 0,
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
          return get(myFollowerListState);
        case 'following':
          return get(myFollowingListState);
        default:
          return [];
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
