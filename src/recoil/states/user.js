import { selector } from 'recoil';
import { mainApis } from '../../api';

export const userSelector = selector({
  key: 'userSelector',
  get: async () => {
    const { data } = await mainApis.getUserInfo();
    return data;
  },
});
