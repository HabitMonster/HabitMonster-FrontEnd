import { useSetRecoilState } from 'recoil';
import { habitReqIdState } from '../recoil/states/habit';

const useRefreshHabitAsyncState = () => {
  const setHabitID = useSetRecoilState(habitReqIdState);
  return () => {
    setHabitID((id) => id + 1);
  };
};

export default useRefreshHabitAsyncState;
