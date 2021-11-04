// import instance from '../lib/axios';
import A from '../lib/testing';

export const statisticApi = {
  getStatistics: (date) => A.get(`/statistics?date=${date}`),
};
