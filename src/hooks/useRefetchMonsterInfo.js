import { useSetRecoilState } from 'recoil';
import { monsterRefetchToggler } from '../recoil/states/monster';

export default function useRefetchMonsterInfo() {
  const update = useSetRecoilState(monsterRefetchToggler);
  return () => {
    update((id) => id + 1);
  };
}
