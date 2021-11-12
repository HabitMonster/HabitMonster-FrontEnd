import instance from '../lib/axios';

export const myPageApis = {
  loadUserData: () => instance.get('/user/info'),
  // 마이페이지 유저 정보 조회
  editUserName: (username) => instance.patch('/user/name', { username }),

  editMonsterName: (monsterName) =>
    instance.patch('/monster/nameChange', { monsterName }),
};