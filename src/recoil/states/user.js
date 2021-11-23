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

//followerlist refetch atom
export const followerListRefetchToggler = atom({
  key: 'followerListRefetchToggler',
  default: 0,
});

//followinglist refetch atom
export const followingListRefetchToggler = atom({
  key: 'followingListRefetchToggler',
  default: 0,
});

// 본인 followerList 가져오는 atom
export const myFollowerListState = atom({
  key: 'myFollowerListState',
  default: selector({
    key: 'myFollowerListState',
    get: async ({ get }) => {
      get(followerListRefetchToggler);
      try {
        const { data } = await myPageApis.getFollowerList();
        console.log('myFollowerListState', data);
        return data?.followers ?? [];
      } catch (error) {
        console.error('myFollowerList error', error);
      }
    },
  }),
});

// 마이페이지 진입시 팔로워리스트 카운트 셀렉터
export const myFollowerListCountSelector = selector({
  key: 'myFollowerListCountSelector',
  get: ({ get }) => get(myFollowerListState)?.length ?? 0,
});

// 본인 팔로잉리스트 아톰
export const myFollowingListState = atom({
  key: 'myFollowingListState',
  default: selector({
    key: 'myFollowingListSelector',
    get: async ({ get }) => {
      get(followingListRefetchToggler);
      try {
        const { data } = await myPageApis.getFollowingList();
        console.log('myFollowingState', data);
        return data?.followings ?? [];
      } catch (error) {
        console.error('myFollowing error', error);
        return [];
      }
    },
  }),
});

// 마이페이지 진입시 팔로잉리스트 카운트 셀렉터
export const myFollowingListCountSelector = selector({
  key: 'myFollowingListCountSelector',
  get: ({ get }) => get(myFollowingListState)?.length ?? 0,
});

export const myFollowListByType = selectorFamily({
  key: 'myFollowListByType',
  get:
    (type) =>
    ({ get }) => {
      // followerList, followingList를 타입에 따라 가져오는 get 함수
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
    ({ set }) => {
      // followerList, followingList를 초기화 시켜주는 selectorFamily set 함수
      switch (type) {
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
