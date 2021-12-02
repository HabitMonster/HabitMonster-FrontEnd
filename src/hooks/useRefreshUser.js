import {
  useResetRecoilState,
  useRecoilRefresher_UNSTABLE,
  useRecoilCallback,
} from 'recoil';
import { defaultAuthSelector } from '../recoil/states/auth';
import {
  defaultHabitResponseSelector,
  habitIdListState,
  habitListState,
  myHabitCountState,
} from '../recoil/states/habit';
import { monsterSectionShirnkToggler } from '../recoil/states/ui';

export default function useRefresh() {
  const refreshAuth = useRecoilRefresher_UNSTABLE(defaultAuthSelector);
  const resetShrinkSection = useResetRecoilState(monsterSectionShirnkToggler);

  const refresher = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        refreshAuth();
        const {
          totalHabitCount: newUserTotalHabitCount,
          habits: newUserHabits,
        } = await snapshot.getPromise(defaultHabitResponseSelector);

        set(habitListState, newUserHabits);
        set(
          habitIdListState,
          newUserHabits.map(({ habitId }) => habitId),
        );
        set(myHabitCountState, newUserTotalHabitCount);
        resetShrinkSection();
      },
    [],
  );

  return refresher;
}
