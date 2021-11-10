import instance from '../lib/axios';

export const monsterApis = {
  loadStartMonster: () => instance.get('/monsters'),
  // 아바타 요청

  setMonster: (monsterInfo) => instance.patch('/user/monster', monsterInfo),
  // 아바타선택
  // "avatarId" : Long,"avatarName" : "String"

  loadMonsterCollection: () => instance.get('/user/monsters'),
  // 해당 유저가 모은 모든 몬스터 불러오기(몬스터 도감)

  updateMonsterNmae: (monsterName) =>
    instance.patch('/monster/nameChange', monsterName),
  // 몬스터 이름 업데이트 {"monsterName" : "String"}
};
