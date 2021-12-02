import React from 'react';
import styled from 'styled-components';

import { MainMonster } from '../components/monster';
import { Gnb } from '../components/gnb';
import { TodayHabitList } from '../components/habit';

import { setFlexStyles } from '../styles';

const Main = () => {
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
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  })}

  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, var(--bg-wrapper), var(--bg-wrapper));
  position: relative;
`;

export default Main;
