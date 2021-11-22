import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { habitIdListState } from '../../recoil/states/habit';

import { TodayHabit, NoHabitHelper } from './';

const TodayHabitList = () => {
  const habitIdList = useRecoilValue(habitIdListState);

  return (
    <HabitContainer>
      {habitIdList.length ? (
        <HabitList>
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
  overflow-y: scroll;
  border-radius: var(--border-radius-semi);
`;

const HabitList = styled.div`
  padding-bottom: 84px;
`;

export default TodayHabitList;
