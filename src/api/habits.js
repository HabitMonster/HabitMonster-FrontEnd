import A from '../lib/testing';

// TODO
// 1. Refactor with tokenInstance.

export default {
  getCategoryList: () => A.get('/categories'),
  getHabitPreset: (categoryId) => A.get(`/categories/${categoryId}/presets`),
  saveHabitWithPreset: (presetId) => A.post(`/presets/${presetId}`),
  saveHabitWithHands: (body) => A.post('/habits', body),
  checkHabit: (habitId) => A.post(`/habits/check/${habitId}`),
};
