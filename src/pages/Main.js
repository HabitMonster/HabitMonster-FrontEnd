import React from 'react';
import styled from 'styled-components';

import { MainMonster } from '../components/monster';
import { Gnb } from '../components/gnb';
import { TodayHabitList } from '../components/habit';

const Main = () => {
  console.log(process.env.REACT_APP_BASE_URL);
  return (
    <>
      <Wrapper className="test">
        <MainMonster />
        <TodayHabitList />
      </Wrapper>
      <Gnb />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, var(--bg-wrapper), var(--bg-wrapper));
  position: relative;
`;

export default Main;
