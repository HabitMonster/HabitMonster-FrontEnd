import { atom, selector } from 'recoil';
import { mainApis } from '../../api';

export const habitState = atom({
  key: 'habitState',
  default: {
    fieldName: 'habits',
  },
});

export const habitAccomplishState = atom({
  key: 'todayHabitState',
  default: {
    habitId: null,
  },
});

export const habitSelector = selector({
  key: 'habitSelector',
  get: async () => {
    const { data } = await mainApis.getHabitsInfo();
    return data;
  },
});
