// import instance from '../lib/axios';

import instance from '../lib/testing';

export const avatarApis = {
  loadAvatar: () => instance.get('/monsters'),
  // 아바타 요청
  setAvatar: (avatarInfo) => instance.patch('/user/monster', avatarInfo),
  // 아바타선택
  // "avatarId" : Long,"avatarName" : "String"
};
