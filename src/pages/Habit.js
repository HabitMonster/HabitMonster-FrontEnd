import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import Loading from './Loading';
import { HabitCard } from '../components/main';
import { mainDataSelectorFamily, habitState } from '../recoil/states';

const Habit = () => {
  const { fieldName } = useRecoilValue(habitState);
  const habits = useRecoilValueLoadable(mainDataSelectorFamily(fieldName));

  switch (habits.state) {
    case 'hasValue':
      return (
        <HabitWrapper className="habitWrapper">
          <TitleContainer className="titleContainer">
            <Title className="title">오늘의 습관</Title>
            <RestHabit className="restHabit">아직 12개가 남았어요!</RestHabit>
          </TitleContainer>
          <HabitContainer className="habitContainer">
            <HabitList className="habitList">
              {habits.contents.map((habit, idx) => {
                return <HabitCard key={idx} habit={habit} />;
              })}
            </HabitList>
          </HabitContainer>
        </HabitWrapper>
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      return habits.contents;
  }
};

const HabitWrapper = styled.div`
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

const RestHabit = styled.p`
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

const HabitList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

export default Habit;
