import tokenInstance from '../lib/axios';

export const myPageApis = {
  editUserName: (username) => tokenInstance.patch('/user/name', username),
  editMonsterName: (monsterName) =>
    tokenInstance.patch('/monster/name', monsterName),
  loadNoticeData: () => tokenInstance.get('/notice'),
  deleteUser: () => tokenInstance.delete('/user'),
  getFollowerList: () => tokenInstance.get(`/followers`),
  getFollowingList: () => tokenInstance.get(`/followings`),
};
