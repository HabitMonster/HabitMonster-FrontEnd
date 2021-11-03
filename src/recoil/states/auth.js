import { atom } from 'recoil';

const loginState = atom({
  key: 'loginState',
  default: {
    isFirstLogin: false,
  },
});

export { loginState };
