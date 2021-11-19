import { atom, atomFamily, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { userApis } from '../../api';

const { persistAtom } = recoilPersist();

export const monsterCodeState = atom({
  key: 'monsterCodeState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

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

// 전용 API 요청하는게 어떨지? [ Request : 몬스터코드, 습관ID  /  Response : 해당 유저의 해당 습관 상세 정보]
export const searchUserHabitSelector = selectorFamily({
  key: 'searchUserInfoSelector',
  get:
    (habitId) =>
    async ({ get }) => {
      const monsterCode = get(monsterCodeState);
      try {
        const { data } = await userApis.getUserInfo(monsterCode);
        const habit = data.habits.find((habit) => {
          return habit.habitId === Number(habitId);
        });
        return habit;
      } catch (error) {
        console.log(error.response);
        return;
      }
    },
});
