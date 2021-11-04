// import instance from '../lib/axios';
import instance from '../lib/testing';

export const mainApis = {
  getMainInfo: () => instance.get('/main'),
  getMonsterInfo: () => instance.get('/user/monster'),
  getUserInfo: () => instance.get('/user/info'),
  getHabitsInfo: () => instance.get('/user/habits'),
};
