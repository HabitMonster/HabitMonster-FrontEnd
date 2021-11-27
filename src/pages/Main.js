import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
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
  const changeModalOpen = useRecoilValue(monsterChangeTogglerState);
  const webViewWrapper = useRef(null);

  useEffect(() => {
    if (changeModalOpen) {
      setIsMonsterModalOpen(changeModalOpen);
      return;
    }
  }, [changeModalOpen, monster.monsterExpPoint, monster.monsterLevel]);

  return (
    <>
      <Wrapper ref={webViewWrapper}>
        <MainMonster webViewWrapper={webViewWrapper} />
        <TodayHabitList />
      </Wrapper>
      <Gnb />
      {isMonsterModalOpen && (
        <Modal
          webViewWrapper={webViewWrapper}
          open={isMonsterModalOpen}
          onClose={() => setIsMonsterModalOpen(false)}
          blurmode={true}
        >
          <LevelUp
            monsterId={monster.monsterId}
            onClickSelect={() => {
              history.push('/select', {
                levelOneId: monster.levelOneId,
                monsterLevel: monster.monsterLevel,
              });
            }}
            onClickStay={() => {
              setIsMonsterModalOpen(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  // esacpe for issue.
  /* height: calc(100% - 80px); */
  height: 100%;
  background: linear-gradient(0deg, var(--bg-wrapper), var(--bg-wrapper));
  position: relative;
`;

export default Main;
