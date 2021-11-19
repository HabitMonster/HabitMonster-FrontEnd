import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { monsterState } from '../recoil/states/monster';
import { MainMonster } from '../components/monster';
import { TodayHabitList } from '../components/habit';
import Feedback from '../components/forTest/Feedback';
import { Modal } from '../components/common';
import { miniThrottle } from '../utils/event';
import '../assets/fonts/font.css';
import { Congrats } from '../assets/images/main';
//TODOS
//1.Refactor with getBoundingClientRect()
// Monster.monsterLevel === 5
const Main = () => {
  const habitSection = useRef(null);
  const [shrinked, setShrinked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const monster = useRecoilValue(monsterState);

  useEffect(() => {
    const { current } = habitSection;

    const handleScroll = miniThrottle(() => {
      if (current.scrollTop >= 24) {
        setShrinked(true);
        current.removeEventListener('scroll', handleScroll);
      }
    }, 150);

    current.addEventListener('scroll', handleScroll);

    return () => current.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const condition = monster.monsterLevel === 5;
    console.log(monster.monsterLevel, monster.monsterExpPoint);
    setIsModalOpen(condition);
  }, [monster]);

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
      </Wrapper>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          blurmode={true}
        >
          <img src={Congrats} alt="" />
          <p>ㅊㅋㅊㅋ</p>
          <button
            onClick={() => {
              window.location.href = '/monster';
              setIsModalOpen(false);
            }}
          >
            다음몬스터 고르기
          </button>
          <button onClick={() => setIsModalOpen(false)}>유지하기</button>
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
  height: 100vh;
  background: linear-gradient(0deg, var(--bg-wrapper), var(--bg-wrapper));
  position: relative;
`;

export default Main;
