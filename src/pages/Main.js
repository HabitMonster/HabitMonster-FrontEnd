import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { MainMonster } from '../components/monster';
import { TodayHabitList } from '../components/habit';
import Feedback from '../components/forTest/Feedback';
import { miniThrottle } from '../utils/event';
import '../assets/fonts/font.css';

//TODOS
//1.Refactor with getBoundingClientRect()

const Main = () => {
  const habitSection = useRef(null);
  const [shrinked, setShrinked] = useState(false);

  useEffect(() => {
    const { current } = habitSection;

    const handleScroll = miniThrottle(() => {
      if (current.scrollTop >= 24) {
        setShrinked(true);
        current.removeEventListener('scroll', handleScroll);
      }
    }, 200);

    current.addEventListener('scroll', handleScroll);

    return () => current.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Wrapper>
      <Feedback />
      <TestSection>
        <MainMonster heightShrinked={shrinked} />
      </TestSection>
      <HabitSection ref={habitSection}>
        <TodayHabitList />
      </HabitSection>
    </Wrapper>
  );
};

const TestSection = styled.section`
  width: 100%;
  max-height: 434px;
  z-index: 2;
`;

const HabitSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 24px;
  overflow-y: scroll;
  border-radius: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(0deg, var(--bg-wrapper), var(--bg-wrapper));
  position: relative;
`;

export default Main;
