import { useSetRecoilState } from 'recoil';

const useRefreshHabitAsyncState = () => {
  const setHabitID = useSetRecoilState(habitReqIdState);
  return () => {
    setHabitID((id) => id + 1);
  };
};

export default useRefreshHabitAsyncState;
