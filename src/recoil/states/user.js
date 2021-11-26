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
    key: 'myFollowerListSelector',
    get: async ({ get }) => {
      get(followerListRefetchToggler);
      try {
        const { data } = await myPageApis.getFollowerList();
        // console.log('myFollowerListState', data);
        return data?.followers ?? [];
      } catch (error) {
        console.error('myFollowerList error', error);
      }
    },
  }),
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
        // console.log('myFollowingState', data);
        return data?.followings ?? [];
      } catch (error) {
        console.error('myFollowing error', error);
        return [];
      }
    },
  }),
});

// 마이페이지 진입시 팔로워리스트 카운트
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
    ({ set }, newType) => {
      // refetchType을 결정한다 (기존타입과 새로운 타입)
      const refetchType = newType ?? type;
      // followerList, followingList를 초기화 시켜주는 selectorFamily set 함수
      switch (refetchType) {
        case 'followers':
          // console.log('refetch followers');
          set(followerListRefetchToggler, (v) => v + 1);
          break;
        case 'following':
          // console.log('refetch following');
          set(followingListRefetchToggler, (v) => v + 1);
          break;
        default:
          // console.log('refetch all follow list');
          set(followerListRefetchToggler, (v) => v + 1);
          set(followingListRefetchToggler, (v) => v + 1);
          break;
      }
    },
});

// export const updaterSelector = selector({
//   key: 'updaterSelector',
//   get: ({get}) => {

//   },
// })
