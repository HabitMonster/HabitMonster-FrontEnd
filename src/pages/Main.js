import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  monsterState,
  monsterChangeTogglerState,
} from '../recoil/states/monster';

import { MainMonster, LevelUp } from '../components/monster';
import { Gnb } from '../components/gnb';
import { TodayHabitList } from '../components/habit';
import { Modal } from '../components/common';

const Main = () => {
  const history = useHistory();
  const monster = useRecoilValue(monsterState);
  const [isMonsterModalOpen, setIsMonsterModalOpen] = useState(false);
  const [changeModalOpen, setChangeModalOpen] = useRecoilState(
    monsterChangeTogglerState,
  );

  useEffect(() => {
    if (changeModalOpen) {
      setIsMonsterModalOpen(changeModalOpen);
      return;
    }
  }, [changeModalOpen, monster.monsterExpPoint, monster.monsterLevel]);

  return (
    <>
      <Wrapper>
        <MonsterSection>
          <MainMonster />
        </MonsterSection>
        <HabitSection>
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
            onClickStay={() => {
              setIsMonsterModalOpen(false);
              setChangeModalOpen(false);
            }}
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
  padding-top: 24px;
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
`;

export default Main;
