import { atom, selector, selectorFamily } from 'recoil';
import { userApis } from '../../api';
import { OK } from '../../constants/statusCode';

export const searchUserReFetchToggler = atom({
  key: 'searchUserReFetchToggler',
  default: 0,
});

export const searchUserInfoState = selectorFamily({
  key: 'searchUserInfoSelector',
  get:
    (monsterCode) =>
    async ({ get }) => {
      try {
        get(searchUserReFetchToggler);
        const { data } = await userApis.getUserInfo(monsterCode);

        if (data.statusCode === OK) {
          return data;
        }
      } catch (error) {
        console.error(error.response);
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

export const recommendedUserListRefetchToggler = atom({
  key: 'recommendedUserListRefetchToggler',
  default: 0,
});

export const recommendedUserSelector = selector({
  key: 'recommendedUserSelector',
  get: async ({ get }) => {
    get(recommendedUserListRefetchToggler);
    try {
      const { data } = await userApis.getRecommendedUsers();

      if (data.statusCode === OK) {
        const mappedUserList = data.userList.map(({ title, userInfo }) => ({
          title,
          ...userInfo,
        }));

        return mappedUserList;
      }
    } catch (error) {
      throw error;
    }
  },
});
