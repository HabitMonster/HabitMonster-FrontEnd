import React from 'react';
import styled from 'styled-components';
import '../assets/fonts/font.css';
import { HabitCard, Exp, Chracter } from '../components/main';

const Main = () => {
  return (
    <React.Fragment>
      <Wrapper className="wrapper">
        <Chracter />
        <Exp />
        <HabitWrapper className="habitWrapper">
          <TitleContainer className="titleContainer">
            <Title className="title">오늘의 습관</Title>
            <RestHabit className="restHabit">아직 12개가 남았어요!</RestHabit>
          </TitleContainer>

          <HabitContainer className="habitContainer">
            <HabitList className="habitList">
              <HabitCard />
              <HabitCard />
              <HabitCard />
              <HabitCard />
              <HabitCard />
              <HabitCard />
              <HabitCard />
              <HabitCard />
              <HabitCard />
              <HabitCard />
              <HabitCard />
            </HabitList>
          </HabitContainer>
        </HabitWrapper>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(180deg, #7057fc 0%, #7057fc 50.52%, #7f9ae6 100%);
`;

const HabitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 417px;
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
  height: 300px;
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
`;

export default Main;
