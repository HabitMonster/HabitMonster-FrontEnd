import { atom, selector } from 'recoil';
import { userApis } from '../../api';
import { OK } from '../../constants/statusCode';

export const monsterCodeState = atom({
  key: 'monsterCodeState',
  default: '',
});

export const isFollowState = atom({
  key: 'isFollowState',
  default: false,
});

// 특정 유저 정보
export const userInfoSelector = selector({
  key: 'userInfoSelector',
  get: async ({ get }) => {
    // get(isFollowState);
    try {
      const monsterCode = get(monsterCodeState);
      console.log(monsterCode);
      const data = await userApis.getUserInfo(monsterCode);
      console.log(data);
      // if (data.statusCode === OK) {
      //   return data;
      // }
    } catch (error) {
      console.log(error.response);
    }
  },
});

export const followerListSelector = selector({
  key: 'followerListSelector',
  get: async ({ get }) => {
    // get(isFollowState);
    try {
      const monsterCode = get(monsterCodeState);
      console.log(monsterCode);
      const { data } = await userApis.getUserFollower(monsterCode);

      if (data.statusCode === OK) {
        return data;
      }
    } catch (error) {
      console.log(error.response);
    }
  },
});

export const followingListSelector = selector({
  key: 'followingListSelector',
  get: async ({ get }) => {
    // get(isFollowState);
    try {
      const monsterCode = get(monsterCodeState);
      console.log(monsterCode);
      const { data } = await userApis.getUserFollowing(monsterCode);
      if (data.statusCode === OK) {
        return data;
      }
    } catch (error) {
      console.log(error.response);
    }
  },
});
