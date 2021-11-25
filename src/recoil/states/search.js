import { atom, selector, selectorFamily } from 'recoil';
import { userApis } from '../../api';
import { OK } from '../../constants/statusCode';

/*
  LoadingPage 보이는 시간을 계산하기 위해 만든 유틸성 함수입니다.
  ex) await testDelay(1000) => 1초동안 비동기 흐름을 멈춥니다.
*/
const testDelay = (wait) => new Promise((resolve) => setTimeout(resolve, wait));

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

export const recommendedUserSelector = selector({
  key: 'recommendedUserSelector',
  get: async () => {
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
