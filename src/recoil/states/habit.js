import { atom, selector, atomFamily, selectorFamily } from 'recoil';
import { mainApis, addHabitApis } from '../../api';
import { OK } from '../../constants/statusCode';

export const defaultHabitsState = atom({
  key: 'asyncDefaultHabitsState',
  default: selector({
    key: 'asyncDefaultHabitsSelector',
    get: async ({ get }) => {
      try {
        const { data } = await mainApis.getHabitsInfo();

        return data.habits;
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

export const habitCategorySelector = selector({
  key: 'habitCategorySelector',
  get: async () => {
    try {
      const { data } = await addHabitApis.getCategoryList();
      if (data.statusCode === OK) {
        return data.categories;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  },
});

export const myHabitCountSelector = selector({
  key: 'myHabitCounterSelector',
  get: ({ get }) => get(defaultHabitsState)?.length ?? 0,
});
