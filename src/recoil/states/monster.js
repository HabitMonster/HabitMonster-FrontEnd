import { authState } from './auth';
import { atom, selector } from 'recoil';
import { mainApis, monsterApis } from '../../api';
import { OK } from '../../constants/statusCode';

export const monsterRefetchToggler = atom({
  key: 'monsterRefetchToggler',
  default: 0,
});

export const asyncDefaultMonster = selector({
  key: 'asyncDefaultMonster',
  get: async ({ get }) => {
    const { isLogin, isFirstLogin } = get(authState);

    if (!isLogin || isFirstLogin) {
      return null;
    }
    get(monsterRefetchToggler);

    if (isFirstLogin) {
    }

    try {
      const { data } = await mainApis.getMonsterInfo();
      return data.monster;
    } catch (error) {
      return error.response;
    }
  },
  set: ({ set }) => {
    // setter가 호출되면 트리거의 값을 1만큼 증가
    // => 트리거 값 변경으로 인해 monsterInfo가 갱신됨
    set(monsterRefetchToggler, (v) => v + 1);
  },
});

export const monsterState = atom({
  key: 'monster',
  default: asyncDefaultMonster,
});

export const userLevelOneMonsterSelector = selector({
  key: 'userLevelOneMonster',
  get: ({ get }) => {
    return get(monsterState).levelOneId;
  },
});

const initiateMonsterSelector = selector({
  key: 'initiateMonster',
  get: async ({ get }) => {
    try {
      const { data, status } = await monsterApis.loadStartMonster();
      console.log(data);
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

    return selectedMonster;
  },
});

export const monsterNameState = atom({
  key: 'monsterNameState',
  default: '',
});

export const monsterNameSelector = selector({
  key: 'monsterNameSelector',
  get: ({ get }) => {
    const monsterName = get(monsterNameState);

    return monsterName;
  },
});
