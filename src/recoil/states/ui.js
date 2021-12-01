import { atom } from 'recoil';

export const monsterSectionShirnkToggler = atom({
  key: 'monsterSectionShirnkToggler',
  default: false,
});

export const monsterAnimationToggler = atom({
  key: 'monsterSectionShrinkToggler',
  default: false,
});

export const globalWebViewWrapperState = atom({
  key: 'globalWebViewWrapperState',
  default: null,
});
