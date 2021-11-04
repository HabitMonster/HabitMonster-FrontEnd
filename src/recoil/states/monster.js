import { atom } from 'recoil';

export const monsterState = atom({
  key: 'monsterState',
  default: {
    fieldName: 'monster',
  },
});
