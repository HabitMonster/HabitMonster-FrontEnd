/*
  @semyung
  - 이 인터페이스는 아직 불안하므로, 지속적인 관리가 필요합니다.
*/

import {
  useResetRecoilState,
  useRecoilRefresher_UNSTABLE,
  useRecoilCallback,
} from 'recoil';

import { defaultAuthSelector } from '../recoil/states/auth';
import {
  defaultHabitResponseSelector,
  habitIdListState,
  defaultHabitsState,
  myHabitCountState,
} from '../recoil/states/habit';

import { monsterSectionShirnkToggler } from '../recoil/states/ui';

export default function useRefresh() {
  const refreshAuth = useRecoilRefresher_UNSTABLE(defaultAuthSelector);
  const resetShrinkSection = useResetRecoilState(monsterSectionShirnkToggler);

  const refresher = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        // 중요한 포인트입니다. 로그아웃을 하거나 탈퇴를 한 이후에는 무조건 '/login'으로 라우팅이 걸릴 것입니다.
        // 로그인 버튼을 눌러 성공한 시점에는 authSelector의 캐싱된 값을 지우고 그 셀렉터를 다시 실행시킵니다.
        // defaultHabitResponseSelector은 defaultAuthSelector을 디펜던시로 가지고 있습니다.
        // 따라서 snapshot으로 접근하면 디펜던시의 변화를 감지하여 셀렉터는 다시 실행이 되고
        // 새로운 요청에 따른 결과값이 반환이 될 것입니다.
        refreshAuth();
        const {
          totalHabitCount: newUserTotalHabitCount,
          habits: newUserHabits,
        } = await snapshot.getPromise(defaultHabitResponseSelector);

        // 우리는 습관을 아톰으로 관리하고있습니다. 아톰의 defaultValue가 셀렉터라면 그 셀렉터가 동적으로
        // 바뀔 때 아톰의 값도 동적으로 바뀝니다.
        // 그러나, 아톰을 생성하게끔 만들기 위해 필요한 셀렉터를 구독하는 컴포넌트가 어디에도 없기 때문에
        // 아톰 업데이트는 전혀 되지 않습니다.
        // 따라서 스냅샷으로 가져온 값을 통해 바로 아톰 자체를 업데이트 시켜줍니다.

        set(defaultHabitsState, newUserHabits);
        set(
          habitIdListState,
          newUserHabits.map(({ habitId }) => habitId),
        );
        set(myHabitCountState, newUserTotalHabitCount);
        resetShrinkSection();

        // 이 로직을 이용한다면, 유저 인포, 몬스터 정보에 관한 모든 것들을 로그인한 시점에서 한꺼번에 가져올 수 있을 것입니다
        // 다시 말해 PrivateRoute의 useEffect 로직을 없앨 수 있습니다.

        // 개선해야할 점
        // - atomFamily에 바인딩 된 값은 메모리에 여전히 남게 되므로, 이를 지워줄 수 있는 장치를 마련할 것입니다.
      },
    [],
  );

  return refresher;
}
