import { atom, selector } from 'recoil';
import { mainApis } from '../../api';

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
