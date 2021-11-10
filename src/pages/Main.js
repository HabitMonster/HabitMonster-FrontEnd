import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { MainMonster } from '../components/monster';
import { TodayHabitList } from '../components/habit';

import '../assets/fonts/font.css';

const Main = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('isFirstLogin') === 'true') {
      return history.replace('/monster');
    }
  }, []);

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
  background: linear-gradient(
    180deg,
    var(--color-main) 0%,
    var(--color-main) 50.52%,
    #7f9ae6 100%
  );
`;

export default Main;
