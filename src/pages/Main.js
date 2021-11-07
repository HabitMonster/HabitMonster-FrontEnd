import React from 'react';
import styled from 'styled-components';
import { MainAvatar } from '../components/avatar';
import { TodayHabitList } from '../components/habit';
import '../assets/fonts/font.css';

const Main = () => {
  return (
    <>
      <Wrapper>
        <MainAvatar />
        <TodayHabitList />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    180deg,
    var(--color-main) 0%,
    var(--color-main) 50.52%,
    #7f9ae6 100%
  );
`;

export default Main;
