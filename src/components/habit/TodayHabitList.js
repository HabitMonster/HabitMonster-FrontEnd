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
  width: 312px;
  overflow-y: scroll;
  border-radius: 4px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const HabitList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

export default TodayHabitList;
