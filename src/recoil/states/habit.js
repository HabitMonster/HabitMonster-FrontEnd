import { atom, selector, atomFamily, selectorFamily } from 'recoil';
import { mainApis, addHabitApis } from '../../api';
import { OK } from '../../constants/statusCode';

/*
  LoadingPage 보이는 시간을 계산하기 위해 만든 유틸성 함수입니다.
  ex) await testDelay(1000) => 1초동안 비동기 흐름을 멈춥니다.
*/
const testDelay = (wait) => new Promise((resolve) => setTimeout(resolve, wait));

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

export const categoryListSelector = selector({
  key: 'categoryList',
  get: async () => {
    try {
      const { data } = await addHabitApis.getCategoryList();
      if (data.statusCode === OK) {
        console.log(data);
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
