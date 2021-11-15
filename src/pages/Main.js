import React from 'react';
import styled from 'styled-components';

import { MainMonster } from '../components/monster';
import { TodayHabitList } from '../components/habit';
import Feedback from '../components/forTest/Feedback';
import '../assets/fonts/font.css';

const Main = () => {
  return (
    <>
      <Wrapper>
        <Feedback />
        <MainMonster />
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
  background: linear-gradient(0deg, var(--bg-wrapper), var(--bg-wrapper));
  position: relative;

  & > *:last-child {
    padding-bottom: 108px; // 68px(gnbHeight) + 40px
  }
`;

export default Main;
