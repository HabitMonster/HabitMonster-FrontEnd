import instance from '../lib/axios';
// import instance from '../lib/testing';

export const myPageApis = {
  loadUserInfo: () => instance.get('/user/info'),

  setAvatar: (nickName) => instance.patch('/user/name', nickName),
};
