import tokenInstance from '../lib/axios';

export const addHabitApis = {
  getCategoryList: () => tokenInstance.get('/categories'),
  getHabitPreset: (categoryId) =>
    tokenInstance.get(`/categories/${categoryId}/presets`),
  saveHabitWithPreset: (presetId) => tokenInstance.post(`/presets/${presetId}`),
  saveHabitWithHands: (body) => tokenInstance.post('/habits', body),
};

export const habitApis = {
  checkHabit: (habitId) => tokenInstance.get(`/habits/check/${habitId}`),
  getHabitDetail: (habitId) => tokenInstance.get(`/habits/${habitId}`),
  editHabitDetail: (habitId, body) =>
    tokenInstance.patch(`/habits/${habitId}`, body),
  deleteHabit: (habitId) => tokenInstance.delete(`/habits/${habitId}`),
};
