import { authState } from './auth';
import { atom, selector, atomFamily, selectorFamily } from 'recoil';
import { mainApis } from '../../api';

export const defaultHabitsState = atom({
  key: 'asyncDefaultHabitsState',
  default: selector({
    key: 'asyncDefaultHabitsSelector',
    get: async ({ get }) => {
      const { isLogin } = get(authState);

      if (!isLogin) {
        return [];
      }

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

//! 습관 지울때에는 어떻게 하면 되나 ?
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

// export const habitIdListState = selector({
//   key: 'habitIdList',
//   get: ({ get }) => {
//     return get(habitsState).map(({ habitId }) => habitId);
//   },
// });

// export const habitIdHashState = selector({
//   key: 'habitIdHash',
//   get: ({ get }) => {
//     return get(habitsState).reduce((hash, cur) => {
//       hash[cur.habitId] = cur;
//       return hash;
//     }, {});
//   },
// });

// export const habitState = selectorFamily({
//   key: 'habit',
//   get:
//     (habitId) =>
//     ({ get }) =>
//       get(habitIdHashState)[habitId],
// });
