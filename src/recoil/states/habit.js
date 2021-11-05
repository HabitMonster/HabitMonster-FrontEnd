import { atom, selector, selectorFamily } from 'recoil';
import { mainApis } from '../../api';

const asyncDefaultHabitsState = selector({
  key: 'asyncDefaultHabits',
  get: async () => {
    try {
      const { data } = await mainApis.getHabitsInfo();
      return data.habits;
    } catch (error) {
      console.error(error);
      throw error;
    }
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

export const habitAccomplishState = atom({
  key: 'todayHabitState',
  default: {
    habitId: null,
  },
});
