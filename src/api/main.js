import instance from '../lib/axios';

export const mainApis = {
  getMainInfo: () => instance.get('/main'),
  getMonsterInfo: () => instance.get('/user/monster'),
  getUserInfo: () => instance.get('/user/info'),
  getHabitsInfo: () => instance.get('/user/habits'),
  checkLogin: () => instance.get('/user/check'),
};
