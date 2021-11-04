import { selectorFamily } from 'recoil';
import { mainApis } from '../../api';

export const mainDataSelectorFamily = selectorFamily({
  key: 'mainDataSelectorFamily',
  get: (fieldName) => async () => {
    try {
      const { data } = await mainApis.getMainInfo();
      return data[fieldName];
    } catch (error) {
      throw error;
    }
  },
});
