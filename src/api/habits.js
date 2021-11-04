import A from '../lib/testing';

// TODO
// 1. Refactor with tokenInstance.

export default {
  getCategoryList: () => A.get('/categories'),
  getHabitPreset: (categoryId) => () =>
    A.get(`/categories/${categoryId}/presets`),
  saveHabitWithPreset: (presetId) => () => A.post(`/presets/${presetId}`),
  saveHabitWithHands: (body) => A.post('/habits', body),

  // 습관 체크
  checkHabit: (habitId) => A.post(`/habits/${habitId}/check`),
};
