// import instance from '../lib/axios';
import instance from '../lib/testing';

export const mainApis = {
  getMainInfo: () => instance.get(`/main`),
};
