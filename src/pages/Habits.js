import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { Habit } from '../components/main';
import Loading from './Loading';
import { habitSelector } from '../recoil/states';

const Habits = () => {
  const habitData = useRecoilValueLoadable(habitSelector);

  switch (habitData.state) {
    case 'hasValue':
      const { habits } = habitData.contents;

      return (
        <Wrapper className="habitWrapper">
          <TitleContainer className="titleContainer">
            <Title className="title">오늘의 습관</Title>
            <RemainHabit className="remainHabit">
              아직 {habits.length}개가 남았어요!
            </RemainHabit>
          </TitleContainer>
          <HabitContainer className="habitContainer">
            <List className="habitList">
              {habits.map((habit, idx) => {
                return <Habit key={idx} habit={habit} className="habit" />;
              })}
            </List>
          </HabitContainer>
        </Wrapper>
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      return habitData.contents;
  }
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
