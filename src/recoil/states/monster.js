import { atom, selector } from 'recoil';
import { mainApis } from '../../api';

export const monsterState = atom({
  key: 'monsterState',
  default: {
    fieldName: 'monster',
  },
});

export const monsterSelector = selector({
  key: 'monsterSelector',
  get: async () => {
    const { data } = await mainApis.getMonsterInfo();
    return data;
  },
});
