import tokenInstance from '../lib/axios';

export const mainApis = {
  getMainInfo: () => tokenInstance.get('/main'),
  getMonsterInfo: () => tokenInstance.get('/user/monster'),
  getUserInfo: () => tokenInstance.get('/user/info'),
  getHabitsInfo: () => tokenInstance.get('/user/habits'),
  checkLogin: () => tokenInstance.get('/user/check'),
};
