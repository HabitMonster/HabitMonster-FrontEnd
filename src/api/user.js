import tokenInstance from '../lib/axios';

export const userApis = {
  searchUser: (monsterCode) => tokenInstance.get(`/user/${monsterCode}`),
  getRecommendedUsers: () => tokenInstance.get('/users/recommended'),
  getUserInfo: (monsterCode) => tokenInstance.get(`/user/${monsterCode}/info`),
  follow: (monsterCode, isFollowed = false) =>
    isFollowed
      ? tokenInstance.delete(`/unFollow/${monsterCode}`)
      : tokenInstance.patch(`/follow/${monsterCode}`),
  checkFollow: (monsterCode) =>
    tokenInstance.get(`/checkFollow/${monsterCode}`),
  getUserFollowers: (monsterCode) =>
    tokenInstance.get(`/followers/${monsterCode}`),
  getUserFollowings: (monsterCode) =>
    tokenInstance.get(`/followings/${monsterCode}`),
};
