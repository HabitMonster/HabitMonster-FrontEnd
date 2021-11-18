import { atom, selector } from 'recoil';

import { formatMonth } from '../../utils/date';
import { statisticApi } from '../../api';
import { OK } from '../../constants/statusCode';

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
    const currentDate = get(currentDateState);
    if (!currentDate) return null;
    try {
      const statisticResponse = await statisticApi.getStatistics(currentDate);

      if (statisticResponse.status === OK) {
        return statisticResponse.data;
      }
    } catch (err) {
      console.log(err);
    }
  },
});
