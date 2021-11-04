import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { habitIdListState } from '../recoil/states/';

import { Habit } from '../components/main';

const Habits = () => {
  const idList = useRecoilValue(habitIdListState);
  return (
    <Wrapper className="habitWrapper">
      <TitleContainer className="titleContainer">
        <Title className="title">오늘의 습관</Title>
        <RemainHabit className="remainHabit">
          아직 {idList.length}개가 남았어요!
        </RemainHabit>
      </TitleContainer>
      <HabitContainer className="habitContainer">
        <List className="habitList">
          {idList.map((id) => (
            <Habit key={id} id={id} />
          ))}
        </List>
      </HabitContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 24px 24px 0px 0px;
`;

const TitleContainer = styled.div`
  height: 88px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 14px;
  box-sizing: border-box;
`;

const Title = styled.p`
  font-family: Apple SD Gothic Neo M;
  font-size: var(--font-semi-medium);
  font-weight: var(--weight-bold);
`;

const RemainHabit = styled.p`
  font-family: Apple SD Gothic Neo L;
  font-size: var(--font-micro);
  font-weight: var(--weight-regular);
`;

const HabitContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-left: 16px;
  padding-right: 16px;

  /* Chrome */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

export default Habits;
