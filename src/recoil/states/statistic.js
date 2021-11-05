import { atom, selector } from 'recoil';

import { formatMonth } from '../../utils/date';

import { statisticApi } from '../../api';

export const currentDateState = atom({
  key: 'currentDateState',
  default: formatMonth(new window.Date(), '-'),
});

export const currentListNameState = atom({
  key: 'currentTabList',
  default: 'total',
});

export const getStatistic = selector({
  key: 'getStatistic',
  get: async ({ get }) => {
    const currentDate = get(currentDateState); // currentDate가 바뀌면 비동기 요청 실행 ㅇㅈ?
    if (!currentDate) return [];
    try {
      const statisticResponse = await statisticApi.getStatistics(currentDate);

      if (statisticResponse.status === 200) {
        return statisticResponse.data;
      }
    } catch (err) {
      console.log(err);
    }
  },
});
