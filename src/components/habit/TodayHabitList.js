import React, { useRef, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  habitIdListState,
  defaultHabitIdListSelector,
} from '../../recoil/states/habit';
import { monsterSectionShirnkToggler } from '../../recoil/states/ui';

import { TodayHabit, NoHabitHelper } from './';
import { miniThrottle } from '../../utils/event';
import { disappearScrollbar } from '../../styles/Mixin';

const TodayHabitList = () => {
  const habitIdList = useRecoilValue(habitIdListState);
  console.log(habitIdList);
  // const habitIdList = useRecoilValue(defaultHabitIdListSelector);
  const setShrink = useSetRecoilState(monsterSectionShirnkToggler);
  const ref = useRef(null);

  useEffect(() => {
    const { current } = ref;
    if (!current) {
      return;
    }
    const handleScroll = miniThrottle(() => {
      if (current.scrollTop >= 24) {
        setShrink(true);
        current.removeEventListener('scroll', handleScroll);
      }
    }, 50);
    current.addEventListener('scroll', handleScroll);

    return () => current.removeEventListener('scroll', handleScroll);
  }, [setShrink]);

  return (
    <HabitContainer>
      {habitIdList.length ? (
        <HabitList ref={ref}>
          {habitIdList.map((id) => (
            <TodayHabit key={id} id={id} />
          ))}
        </HabitList>
      ) : (
        <NoHabitHelper />
      )}
    </HabitContainer>
  );
};

const HabitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 24px;
  border-radius: var(--border-radius-semi);
`;

const HabitList = styled.div`
  padding-bottom: 84px;
  overflow-y: scroll;
  ${disappearScrollbar()};
`;

export default TodayHabitList;
