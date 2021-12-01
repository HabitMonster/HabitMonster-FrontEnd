import { useEffect } from 'react';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilRefresher_UNSTABLE,
} from 'recoil';
import { currentUserConnectionDayState } from '../recoil/states/user';
import {
  habitIdListState,
  habitListState,
  defaultHabitResponseSelector,
} from '../recoil/states/habit';

export default function useRefreshHabits() {
  const [previousConnectionDay, setPreviousConnectionDay] = useRecoilState(
    currentUserConnectionDayState,
  );
  const refreshHabitQuery = useRecoilRefresher_UNSTABLE(
    defaultHabitResponseSelector,
  );

  const refreshHabits = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        refreshHabitQuery();
        const { habits: updatedHabits } = await snapshot.getPromise(
          defaultHabitResponseSelector,
        );
        set(habitListState, updatedHabits);
        set(
          habitIdListState,
          updatedHabits.map(({ habitId }) => habitId),
        );
      },
    [],
  );

  useEffect(() => {
    const currentConnectionDay = new Date().getDay();

    if (currentConnectionDay !== previousConnectionDay) {
      refreshHabits();
      setPreviousConnectionDay(currentConnectionDay);
    }
  }, [previousConnectionDay, refreshHabits, setPreviousConnectionDay]);

  return null;
}
