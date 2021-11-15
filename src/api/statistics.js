import tokenInstance from '../lib/axios';

export const statisticApi = {
  getStatistics: (date) => tokenInstance.get(`/statistics?date=${date}`),
};
