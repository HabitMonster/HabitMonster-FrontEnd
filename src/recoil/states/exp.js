import { atom } from 'recoil';

export const expState = atom({
  key: 'expState',
  default: {
    fieldName: 'expPercentage',
  },
});
