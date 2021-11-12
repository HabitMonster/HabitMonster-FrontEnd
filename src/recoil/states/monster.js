import { atom, selector } from 'recoil';
import { mainApis, monsterApis } from '../../api';
import { OK } from '../../constants/statusCode';

export const monsterRefetchToggler = atom({
  key: 'monsterRefetchToggler',
  default: 0,
});

const asyncDefaultMonster = selector({
  key: 'asyncDefaultMonster',
  get: async ({ get }) => {
    get(monsterRefetchToggler);
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

// 세명
// 플로우에 맞춰서 아톰을 만드신게 보이네요!
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
