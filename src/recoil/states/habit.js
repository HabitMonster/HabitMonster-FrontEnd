import { atom, selector, atomFamily, selectorFamily } from 'recoil';
import { mainApis } from '../../api';
import { OK } from '../../constants/statusCode';

export const defaultHabitsState = atom({
  key: 'asyncDefaultHabitsState',
  default: selector({
    key: 'asyncDefaultHabitsSelector',
    get: async () => {
      try {
        const { data } = await mainApis.getHabitsInfo();

        if (data.statusCode === OK) {
          return data.habits;
        }

        return [];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  }),
});

export const habitIdListState = atom({
  key: 'habitId',
  default: selector({
    key: 'defaultHabitIdSelector',
    get: ({ get }) => get(defaultHabitsState).map(({ habitId }) => habitId),
  }),
});

export const habitsHashSelector = selector({
  key: 'defaultHabitsHashSelector',
  get: ({ get }) =>
    get(defaultHabitsState).reduce((hash, cur) => {
      hash[cur.habitId] = cur;
      return hash;
    }, {}),
});

export const habitStateWithId = atomFamily({
  key: 'habitState',
  default: selectorFamily({
    key: 'habitById',
    get:
      (habitId) =>
      ({ get }) =>
        get(habitsHashSelector)[habitId],
  }),
});

export const myHabitCountSelector = selector({
  key: 'myHabitCountSelector',
  get: ({ get }) => get(defaultHabitsState)?.length ?? 0,
});
