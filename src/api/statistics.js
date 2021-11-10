import A from '../lib/axios';

export const statisticApi = {
  getStatistics: (date) => A.get(`/statistics?date=${date}`),
};
