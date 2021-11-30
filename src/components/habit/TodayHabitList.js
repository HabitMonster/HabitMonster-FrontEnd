import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { habitIdListState } from '../../recoil/states/habit';

import { NoHabitHelper, TodayHabit } from './';
import { disappearScrollbar } from '../../styles/Mixin';

const TodayHabitList = () => {
  const habitIdList = useRecoilValue(habitIdListState);
  const parent = useRef(null);

  return (
    <HabitContainer ref={parent}>
      {habitIdList.length ? (
        habitIdList.map((id) => <TodayHabit parent={parent} key={id} id={id} />)
      ) : (
        <NoHabitHelper />
      )}
    </HabitContainer>
  );
};

export const HabitContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 0 24px;
  margin-top: 24px;

  border-radius: var(--border-radius-semi);
  overflow-y: scroll;
  ${disappearScrollbar()};
`;

export default TodayHabitList;
