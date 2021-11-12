import instance from '../lib/axios';

export const myPageApis = {
  loadUserData: () => instance.get('/user/info'),
  editUserName: (username) => instance.patch('/user/name', username),
  editMonsterName: (monsterName) =>
    instance.patch('/monster/nameChange', monsterName),
};
