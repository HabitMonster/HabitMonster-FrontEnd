import { atom, selector } from 'recoil';
import { mainApis, monsterApis } from '../../api';

const asyncDefaultMonster = selector({
  key: 'asyncDefaultMonster',
  get: async () => {
    try {
      const { data } = await mainApis.getMonsterInfo();
      return data.monster;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

export const monsterState = atom({
  key: 'monster',
  default: asyncDefaultMonster,
});

// @jaekyung : character selection page

const initiateMonsterSelector = selector({
  key: 'initiateMonster',
  get: async () => {
    try {
      const { data } = await monsterApis.loadStartMonster();
      return data.monsters;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

export const babyMonsterState = atom({
  key: 'babyMonster',
  default: initiateMonsterSelector,
});

export const selectedMonster = atom({
  key: 'levelOneMonster',
  default: null,
});
