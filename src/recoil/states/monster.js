import { atom, selector } from 'recoil';
import { mainApis, monsterApis } from '../../api';
import { OK } from '../../constants/statusCode';
import { MAX_LEVEL, MAX_EXP } from '../../constants/monster';

export const defaultMonsterSelector = selector({
  key: 'defaultMonsterSelector',
  get: async () => {
    try {
      const { data } = await mainApis.getMonsterInfo();
      if (data.statusCode === OK) {
        return data.monster;
      }
    } catch (error) {
      return error.response;
    }
  },
});

export const monsterState = atom({
  key: 'monsterState',
  default: defaultMonsterSelector,
});

export const monsterChangeToggler = atom({
  key: 'monsterChangeToggler',
  default: selector({
    key: 'monsterChangeTogglerSelector',
    get: ({ get }) => {
      const monster = get(monsterState);
      return (
        monster.monsterLevel === MAX_LEVEL &&
        monster.monsterExpPoint === MAX_EXP
      );
    },
  }),
});

export const userLevelOneMonsterIdSelector = selector({
  key: 'userLevelOneMonsterIdSelector',
  get: ({ get }) => get(monsterState).levelOneId,
});

const defaultLevelOneMonsterListSelector = selector({
  key: 'defaultLevelOneMonsterListSelector',
  get: async () => {
    try {
      const { data } = await monsterApis.loadStartMonster();

      if (data.statusCode === OK) {
        return data.monsters;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

export const babyMonsterListState = atom({
  key: 'babyMonsterListState',
  default: defaultLevelOneMonsterListSelector,
});

export const selectedLevelOneMonsterState = atom({
  key: 'selectedLevelOneMonsterState',
  default: null,
});
