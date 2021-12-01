import { atom, selector, atomFamily, selectorFamily } from 'recoil';
import { defaultAuthSelector } from './auth';
import { mainApis, addHabitApis } from '../../api';
import { OK } from '../../constants/statusCode';

export const defaultHabitResponseSelector = selector({
  key: 'defaultHabitResponseSelector',
  get: async ({ get }) => {
    const { isLogin } = get(defaultAuthSelector);

    const defaultValue = {
      totalHabitCount: null,
      habits: [],
    };

    if (!isLogin) {
      return defaultValue;
    }

    try {
      const { data } = await mainApis.getHabitsInfo();

      if (data.statusCode === OK) {
        defaultValue.habits = data.habits;
        defaultValue.totalHabitCount = data.totalHabitCount;
      }

      return defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  },
});

export const defaultHabitsSelector = selector({
  key: 'defaultHabitsSelector',
  get: ({ get }) => {
    const { habits } = get(defaultHabitResponseSelector);
    return habits;
  },
});

export const defaultHabitIdListSelector = selector({
  key: 'defaultHabitIdListSelector',
  get: ({ get }) => {
    const { habits } = get(defaultHabitResponseSelector);
    return habits.map(({ habitId }) => habitId);
  },
});

export const habitListState = atom({
  key: 'habitListState',
  default: defaultHabitsSelector,
});

export const habitIdListState = atom({
  key: 'habitIdListState',
  default: defaultHabitIdListSelector,
});

export const habitStateWithId = atomFamily({
  key: 'habitStateWithId',
  default: selectorFamily({
    key: 'habitById',
    get:
      (habitId) =>
      ({ get }) => {
        return get(habitListState).find(({ habitId: id }) => id === habitId);
      },
  }),
});

export const habitProcessCountById = selectorFamily({
  key: 'habitProcessCountById',
  get:
    (habitId) =>
    ({ get }) => {
      return {
        current: get(habitStateWithId(habitId))?.current,
        count: get(habitStateWithId(habitId))?.count,
      };
    },
});

export const defaultMyHabitCountSelector = selector({
  key: 'defaultMyHabitCountSelector',
  get: ({ get }) => get(defaultHabitResponseSelector).totalHabitCount,
});

export const myHabitCountState = atom({
  key: 'myHabitCountState',
  default: defaultMyHabitCountSelector,
});

export const categoryListSelector = selector({
  key: 'categoryListSelector',
  get: async () => {
    try {
      const { data } = await addHabitApis.getCategoryList();
      if (data.statusCode === OK) {
        return data.categories;
      }
    } catch (error) {
      throw error;
    }
  },
});

export const presetListById = selectorFamily({
  key: 'presetListById',
  get: (categoryId) => async () => {
    try {
      const { data } = await addHabitApis.getHabitPreset(categoryId);
      if (data.statusCode === OK) {
        return data.preSets;
      }
    } catch (error) {
      throw error;
    }
  },
});
