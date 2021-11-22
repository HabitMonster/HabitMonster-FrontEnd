import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { monsterState } from '../recoil/states/monster';

import { MainMonster, LevelUp } from '../components/monster';
import { Gnb } from '../components/gnb';
import { TodayHabitList } from '../components/habit';
import Feedback from '../components/forTest/Feedback';
import { Modal } from '../components/common';
import { miniThrottle } from '../utils/event';
import { MAX_LEVEL, MAX_EXP } from '../constants/monster';

import '../assets/fonts/font.css';

//TODOS
//1.Refactor with getBoundingClientRect()
const Main = () => {
  const history = useHistory();
  const habitSection = useRef(null);
  const [shrinked, setShrinked] = useState(false);
  const [isMonsterModalOpen, setIsMonsterModalOpen] = useState(false);
  const [isLevelPopUp, setIsLevelPopUp] = useState(false);
  const monster = useRecoilValue(monsterState);

  useEffect(() => {
    const { current } = habitSection;

    const handleScroll = miniThrottle(() => {
      console.log(current);
      if (current.scrollTop >= 24) {
        console.log('now');
        setShrinked(true);
        current.removeEventListener('scroll', handleScroll);
      }
    }, 50);

    current.addEventListener('scroll', handleScroll);

    return () => current.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isMonsterModalOpen =
      monster.monsterLevel === MAX_LEVEL && monster.monsterExpPoint === MAX_EXP;

    setIsMonsterModalOpen(isMonsterModalOpen);
  }, [monster.monsterExpPoint, monster.monsterLevel]);

  return (
    <>
      <Wrapper>
        <Feedback />
        <MonsterSection>
          <MainMonster heightShrinked={shrinked} />
        </MonsterSection>
        <HabitSection ref={habitSection}>
          <TodayHabitList />
        </HabitSection>
        <Gnb />
      </Wrapper>
      {isMonsterModalOpen && (
        <Modal
          open={isMonsterModalOpen}
          onClose={() => setIsMonsterModalOpen(false)}
          blurmode={true}
        >
          <LevelUp
            onClickSelect={() => {
              history.push('/select', {
                levelOneId: monster.levelOneId,
                monsterLevel: monster.monsterLevel,
              });
            }}
            onClickStay={() => setIsMonsterModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

const MonsterSection = styled.section`
  width: 100%;
  max-height: 434px;
  z-index: 2;
`;

const HabitSection = styled.section`
  width: 100%;
  padding: 24px;
  overflow-y: scroll;
  border-radius: var(--border-radius-semi);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: linear-gradient(0deg, var(--bg-wrapper), var(--bg-wrapper));
  position: relative;
  overflow-y: hidden;
`;

export default Main;
