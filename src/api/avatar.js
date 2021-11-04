// import instance from '../lib/axios';
import A from '../lib/testing';

export const avatarApis = {
  loadAvatar: () => A.get('/monsters'),
  // 아바타 요청
  setAvatar: (avatarInfo) => A.patch('/user/monster', avatarInfo),
  // 아바타선택
  // "avatarId" : Long,"avatarName" : "String"
};
