import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { habitIdListState } from '../../recoil/states/habit';

import { TodayHabit, NoHabitHelper } from './';
import { disappearScrollbar } from '../../styles/Mixin';

const TodayHabitList = () => {
  const habitIdList = useRecoilValue(habitIdListState);
  const parent = useRef(null);

  return (
    <HabitContainer ref={parent}>
      {habitIdList.length ? (
        habitIdList.map((id, index) => (
          <TodayHabit
            parent={parent}
            key={id}
            id={id}
            order={index}
            onMouseUp={(e) => console.log(e)}
          />
        ))
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
  height: 100%;
  padding: 0 24px;
  margin-top: 24px;

  border-radius: var(--border-radius-semi);
  overflow-y: scroll;
  ${disappearScrollbar()};
`;

export default TodayHabitList;
