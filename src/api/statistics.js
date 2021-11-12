import instance from '../lib/axios';

export const statisticApi = {
  getStatistics: (date) => instance.get(`/statistics?date=${date}`),
};
