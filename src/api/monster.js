import tokenInstance from '../lib/axios';

export const monsterApis = {
  loadStartMonster: () => tokenInstance.get('/monsters'),
  setMonster: (monsterInfo) =>
    tokenInstance.patch('/user/monster', monsterInfo),
  loadMonsterCollection: () => tokenInstance.get('/user/monsters'),
  updateMonsterNmae: (monsterName) =>
    tokenInstance.patch('/monster/name', monsterName),
};
