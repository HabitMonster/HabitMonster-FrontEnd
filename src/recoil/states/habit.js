import {
  atom,
  selector,
  atomFamily,
  selectorFamily,
  DefaultValue,
} from 'recoil';

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
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) {
      set(asyncHabitTogglerState, (v) => v + 1);
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
      // habits: get(defaultHabitsSelector),
      // habitIdList: get(defaultHabitIdListSelector),
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

// export const defaultHabitsState = atom({
//   key: 'asyncDefaultHabitsState',
//   default: selector({
//     key: 'habitsList',
//     get: ({ get }) => get(defaultHabitResponseSelector).habits,
//   }),
// });

// export const habitIdListState = atom({
//   key: 'habitId',
//   default: selector({
//     key: 'defaultHabitIdSelector',
//     get: ({ get }) => {
//       const test = get(defaultHabitsState).map(({ habitId }) => habitId);
//       return test;
//     },
//   }),
// });

// export const habitsHashSelector = selector({
//   key: 'defaultHabitsHashSelector',
//   get: ({ get }) =>
//     get(defaultHabitsState).reduce((hash, cur) => {
//       hash[cur.habitId] = cur;
//       return hash;
//     }, {}),
// });

// export const habitStateWithId = atomFamily({
//   key: 'habitState',
//   default: selectorFamily({
//     key: 'habitById',
//     get:
//       (habitId) =>
//       ({ get }) =>
//         get(habitsHashSelector)[habitId],
//   }),
// });
