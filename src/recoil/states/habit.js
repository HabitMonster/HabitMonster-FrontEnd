import { atom, selector, atomFamily, selectorFamily } from 'recoil';

import { defaultAuthSelector } from './auth';

import { mainApis, addHabitApis } from '../../api';
import { OK } from '../../constants/statusCode';

export const asyncHabitTogglerState = atom({
  key: 'asyncHabitTogglerState',
  default: 0,
});

export const defaultHabitResponseSelector = selector({
  key: 'asyncDefaultHabitsSelector',
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
    get(defaultAuthSelector);
    const { habits } = get(defaultHabitResponseSelector);
    return habits;
  },
});

export const defaultHabitIdListSelector = selector({
  key: 'defaultHabitIdListSelector',
  get: ({ get }) => {
    get(defaultAuthSelector);
    const { habits } = get(defaultHabitResponseSelector);
    return habits.map(({ habitId }) => habitId);
  },
});

export const defaultHabitsState = atom({
  key: 'defaultHabitsState',
  default: defaultHabitsSelector,
});

export const habitIdListState = atom({
  key: 'habitId',
  default: defaultHabitIdListSelector,
});

export const habitStateWithId = atomFamily({
  key: 'habitState',
  default: selectorFamily({
    key: 'habitById',
    get:
      (habitId) =>
      ({ get }) => {
        return get(defaultHabitsState).find(
          ({ habitId: id }) => id === habitId,
        );
      },
  }),
});

export const habitTitleSelector = selectorFamily({
  key: 'habitTitleSelector',
  get:
    (habitId) =>
    ({ get }) =>
      get(habitStateWithId(habitId))?.title,
});

export const habitCategorySelector = selectorFamily({
  key: 'habitCategorySelector',
  get:
    (habitId) =>
    ({ get }) =>
      get(habitStateWithId(habitId))?.category,
});

//실험

export const habitDurationSelector = selectorFamily({
  key: 'habitDurationStartSelector',
  get:
    (habitId) =>
    ({ get }) => {
      return {
        start: get(habitStateWithId(habitId))?.durationStart,
        end: get(habitStateWithId(habitId))?.durationEnd,
      };
    },
});

export const habitCurrentAccomplishCountSelector = selectorFamily({
  key: 'habitCurrentAccomplishCountSelector',
  get:
    (habitId) =>
    ({ get }) =>
      get(habitStateWithId(habitId))?.current,
});

export const habitTotalAccomplishSelector = selectorFamily({
  key: 'habitTotalAccomplishSelector',
  get:
    (habitId) =>
    ({ get }) =>
      get(habitStateWithId(habitId))?.count,
});

export const habitAccomplishCheckSelector = selectorFamily({
  key: 'habitAccomplishCheckSelector',
  get:
    (habitId) =>
    ({ get }) =>
      get(habitStateWithId(habitId))?.isAccomplished,
});

export const defaultMyHabitCountSelector = selector({
  key: 'defaultMyHabitCountSelector',
  get: ({ get }) => get(defaultHabitResponseSelector).totalHabitCount,
});

export const myHabitCountState = atom({
  key: 'myHabitCountState',
  default: defaultMyHabitCountSelector,
});

export const refresher = selector({
  key: 'refresher',
  get: ({ get }) => {
    return {
      habitResponse: get(defaultHabitResponseSelector),
    };
  },
});

export const categoryListSelector = selector({
  key: 'categoryList',
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

export const presetListSelector = selectorFamily({
  key: 'presetListByCategoryId',
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
