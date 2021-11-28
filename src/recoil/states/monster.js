import { atom, selector } from 'recoil';
import { mainApis, monsterApis } from '../../api';
import { OK } from '../../constants/statusCode';
import { MAX_LEVEL, MAX_EXP } from '../../constants/monster';

export const monsterRefetchToggler = atom({
  key: 'monsterRefetchToggler',
  default: 0,
});

export const asyncDefaultMonster = selector({
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
  set: ({ set }) => {
    set(monsterRefetchToggler, (v) => v + 1);
  },
});

export const monsterState = atom({
  key: 'monster',
  default: asyncDefaultMonster,
});

export const monsterChangeTogglerState = atom({
  key: 'persistMonsterState',
  default: selector({
    key: 'defaultMonsterMaxLevelCheckSelector',
    get: ({ get }) => {
      const monster = get(monsterState);
      return (
        monster.monsterLevel === MAX_LEVEL &&
        monster.monsterExpPoint === MAX_EXP
      );
    },
  }),
});

export const userLevelOneMonsterSelector = selector({
  key: 'userLevelOneMonster',
  get: ({ get }) => {
    return get(monsterState).levelOneId;
  },
});

const initiateMonsterSelector = selector({
  key: 'initiateMonster',
  get: async () => {
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

export const monsterNameState = atom({
  key: 'monsterNameState',
  default: '',
});
