import { atom, selectorFamily } from 'recoil';
import { userApis } from '../../api';

export const refreshInfoState = atom({
  key: 'refreshInfoState',
  default: 0,
});

export const searchUserInfoState = selectorFamily({
  key: 'searchUserInfoSelector',
  get:
    (monsterCode) =>
    async ({ get }) => {
      try {
        get(refreshInfoState);
        const { data } = await userApis.getUserInfo(monsterCode);
        return data;
      } catch (error) {
        console.log(error.response);
        return;
      }
    },
});

export const searchUserHabitSelector = selectorFamily({
  key: 'searchUserInfoSelector',
  get:
    ({ habitId, monsterCode }) =>
    ({ get }) => {
      const data = get(searchUserInfoState(monsterCode));
      const habit = data.habits.find((habit) => {
        return habit.habitId === Number(habitId);
      });
      return habit;
    },
});
