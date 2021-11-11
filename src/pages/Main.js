import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { MainMonster } from '../components/monster';
import { TodayHabitList } from '../components/habit';

import '../assets/fonts/font.css';

const Main = () => {
  if (localStorage.getItem('isFirstLogin') === 'true') {
    return <Redirect to="/monster" />;
  }

  return (
    <>
      <Wrapper>
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
  background: linear-gradient(0deg, #070707, #070707);
`;

export default Main;
