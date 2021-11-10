// import instance from '../lib/axios';
import instance from '../lib/testing';

export const monsterApis = {
  loadStartMonster: () => instance.get('/monsters'),
  // 아바타 요청
  setMonster: (monsterInfo) => instance.patch('/user/monster', monsterInfo),
  // 아바타선택
  // "avatarId" : Long,"avatarName" : "String"
  loadMonsterCollection: () => instance.get('/user/monsters'),
  // 해당 유저가 모은 모든 몬스터 불러오기(몬스터 도감)
};
