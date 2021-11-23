import { atom, selector, atomFamily, selectorFamily } from 'recoil';
import { mainApis } from '../../api';
import { OK } from '../../constants/statusCode';

export const defaultHabitResponseSelector = selector({
  key: 'asyncDefaultHabitsSelector',
  get: async () => {
    const defaultValue = {
      totalHabitCount: null,
      habits: [],
    };

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

export const defaultHabitsState = atom({
  key: 'asyncDefaultHabitsState',
  default: selector({
    key: 'habitsList',
    get: ({ get }) => get(defaultHabitResponseSelector).habits,
  }),
});

export const habitIdListState = atom({
  key: 'habitId',
  default: selector({
    key: 'defaultHabitIdSelector',
    get: ({ get }) => {
      const test = get(defaultHabitsState).map(({ habitId }) => habitId);
      return test;
    },
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

/*
  습관이 추가되고, 제거될 때 myHabitCountState의 값 역시 변화를 해야하므로
  selector에서 atom으로 바꾸겠습니다
*/
export const myHabitCountState = atom({
  key: 'myHabitCountState',
  default: selector({
    key: 'defaultCountSelector',
    get: ({ get }) => get(defaultHabitResponseSelector).totalHabitCount,
  }),
});
