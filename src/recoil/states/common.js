import { atom } from 'recoil';

// Layout scroll lock
export const layoutScrollState = atom({
  key: 'layoutScrollState',
  default: false,
});
