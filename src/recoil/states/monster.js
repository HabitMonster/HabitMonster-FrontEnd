import { atom, selector } from 'recoil';
import { mainApis, monsterApis } from '../../api';
import { OK } from '../../constants/statusCode';

const asyncDefaultMonster = selector({
  key: 'asyncDefaultMonster',
  get: async () => {
    try {
      const { data } = await mainApis.getMonsterInfo();
      return data.monster;
    } catch (error) {
      return error.response;
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
  get: async ({ get }) => {
    try {
      const { data, status } = await monsterApis.loadStartMonster();
      console.log('data', data);
      if (status === OK) {
        return data.monsters;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

export const babyMonsterState = atom({
  key: 'babyMonsterState',
  default: initiateMonsterSelector,
});

export const selectedMonsterState = atom({
  key: 'selectedMonsterState',
  default: null,
});

export const getSelectedMonster = selector({
  key: 'getSelectedMonster',
  get: ({ get }) => {
    const selectedMonster = get(selectedMonsterState);
    console.log('selectedMonster', selectedMonster);

    return selectedMonster;
  },
});

export const monsterNameState = atom({
  key: 'monsterNameState',
  default: '',
});

export const monsterNameSelector = selector({
  key: 'monsterNameSelector',
  get: ({ get }) => {
    const monsterName = get(monsterNameState);
    console.log('getMonsterName', monsterName);

    return monsterName;
  },
});
