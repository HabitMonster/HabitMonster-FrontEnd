import { atom } from 'recoil';

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
