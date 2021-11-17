import tokenInstance from '../lib/axios';

export const myPageApis = {
  loadUserData: () => tokenInstance.get('/user/info'),
  editUserName: (username) => tokenInstance.patch('/user/name', username),
  editMonsterName: (monsterName) =>
    tokenInstance.patch('/monster/nameChange', monsterName),
  loadNoticeData: () => tokenInstance.get('/notice'),
  loadFollowers: () => tokenInstance.get('/followers'),
  loadFollowings: () => tokenInstance.get('/followings'),
  deleteUser: () => tokenInstance.delete('/user'),
};
