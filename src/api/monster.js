import instance from '../lib/axios';

export const monsterApis = {
  loadMonster: () => instance.get('/monsters'),
  // 몬스터 요청
  setMonster: (monsterInfo) => instance.patch('/user/monster', monsterInfo),
  // 몬스터 선택
  // "monsterId" : Long, "monsterName" : "String"
};
