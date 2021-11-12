import { atom, selector, selectorFamily } from 'recoil';
import { mainApis } from '../../api';

export const habitReqIdState = atom({
  key: 'habitReqId',
  default: 1,
});

export const asyncDefaultHabitsState = selector({
  key: 'asyncDefaultHabits',
  get: async ({ get }) => {
    get(habitReqIdState);
    try {
      const { data } = await mainApis.getHabitsInfo();
      return data.habits;
    } catch (error) {
      throw error;
    }
  },
  set: ({ set }) => {
    set(habitReqIdState, (id) => id + 1);
  },
});

export const habitsState = atom({
  key: 'habits',
  default: asyncDefaultHabitsState,
});

export const habitIdListState = selector({
  key: 'habitIdList',
  get: ({ get }) => {
    return get(habitsState).map(({ habitId }) => habitId);
  },
});

export const habitIdHashState = selector({
  key: 'habitIdHash',
  get: ({ get }) => {
    return get(habitsState).reduce((hash, cur) => {
      hash[cur.habitId] = cur;
      return hash;
    }, {});
  },
});

export const habitState = selectorFamily({
  key: 'habit',
  get:
    (habitId) =>
    ({ get }) =>
      get(habitIdHashState)[habitId],
});
