import A from '../lib/axios';

// TODO
// 1. Refactor with tokenInstance.

export const addHabitApis = {
  getCategoryList: () => A.get('/categories'),
  getHabitPreset: (categoryId) => A.get(`/categories/${categoryId}/presets`),
  saveHabitWithPreset: (presetId) => A.post(`/presets/${presetId}`),
  saveHabitWithHands: (body) => A.post('/habits', body),
};

export const habitApis = {
  checkHabit: (habitId) => A.get(`/habits/check/${habitId}`),
  getHabitDetail: (habitId) => A.get(`/habits/${habitId}`),
  editHabitDetail: (habitId, body) => A.patch(`/habits/${habitId}`, body),
  deleteHabit: (habitId) => A.delete(`/habits/${habitId}`),
};
