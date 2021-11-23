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

/*
  Habit의 가장 바깥 영역입니다.
  MainPage의 총 Height에서 몬스터 섹션이 차지하는 Height(434px)을 제외한 나머지 Height을 이 섹션에서 차지합니다.
  그런데 실제 아이템의 길이는 이 섹션의 높이를 초과합니다.
  총 높이를 따지면 100vh를 넘기게 됩니다.
  App.js의 레이아웃에 있는 Height은 100vh으로 고정되어있으며, overflow-y: hidden을 주었습니다.
  이 컴포넌트에 overflow-y를 visible로 주면 '안보일것입니다'. 부모 컨테이너에서 overflow-y: hidden을 주었기 때문입니다.
  반면 scroll로 주면 '스크롤되서 보일 것입니다.'
*/

const HabitSection = styled.section`
  width: 100%;
  padding-top: 24px;
  overflow-y: scroll;
  border-radius: var(--border-radius-semi);

  /* 
    기존에는 HabitList에서 overflow-y: scroll을 주고 스크롤바를 없앴습니다.
    그러나, 지금은 화면이 줄어드는 효과 때문에 이곳에서(스크롤이 생기는 곳) 없애주어야 합니다.
    따라서 코드를 옮깁니다.
  */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: linear-gradient(0deg, var(--bg-wrapper), var(--bg-wrapper));
  position: relative;
`;

export default Main;
