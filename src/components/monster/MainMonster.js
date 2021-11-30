import React, { useState, useRef, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  monsterChangeTogglerState,
  monsterState,
} from '../../recoil/states/monster';
import {
  monsterSectionShirnkToggler,
  monsterAnimationTogglerState,
} from '../../recoil/states/ui';

import { MonsterThumbnail, Modal } from '../common';
import { MonsterSearchSection, LevelUp } from '.';
import { BottomDialog } from '../dialog';

import { whiteOpacity } from '../../styles';
import { appendPostPosition } from '../../utils/appendPostPosition';
import { MAX_LEVEL, MAX_EXP } from '../../constants/monster';

import { mainBackground } from '../../assets/images/background';

const MainMonster = () => {
  const monster = useRecoilValue(monsterState);
  const [modalOpen, setModalOpen] = useState(false);
  const [levelUpMessage, setLevelUpMessage] = useState('');

  const [maxLevelModalOpen, setMaxLevelModalOpen] = useState(false);
  const isMaxLevel = useRecoilValue(monsterChangeTogglerState);

  const previousLevel = useRef(monster.monsterLevel);
  const heightShrinked = useRecoilValue(monsterSectionShirnkToggler);
  const [animation, setAnimation] = useRecoilState(
    monsterAnimationTogglerState,
  );

  const history = useHistory();

  const handleMonsterClick = () => {
    if (animation) {
      return;
    }

    setAnimation((prev) => !prev);
    setTimeout(() => setAnimation((prev) => !prev), 1000);
  };

  useEffect(() => {
    setLevelUpMessage('');
    if (
      monster.monsterLevel === MAX_LEVEL &&
      monster.monsterExpPoint === MAX_EXP
    ) {
      return;
    }

    const { current: previous } = previousLevel;
    const current = monster.monsterLevel;
    if (previous === current) {
      return null;
    }

    setModalOpen((prev) => !prev);
    setLevelUpMessage(
      `레벨 ${previous}에서 레벨 ${current}로 업그레이드 했습니다!`,
    );
    previousLevel.current = monster.monsterLevel;
  }, [monster.monsterLevel, monster.monsterExpPoint]);

  useEffect(() => {
    if (isMaxLevel) {
      setMaxLevelModalOpen(isMaxLevel);
    }
  }, [isMaxLevel, monster.monsterExpPoint, monster.monsterLevel]);

  return (
    <MonsterContainer
      level={monster.monsterLevel}
      heightShrinked={heightShrinked}
    >
      <MonsterSearchSection />
      <TitleWrapper heightShrinked={heightShrinked}>
        <Title>
          오늘{' '}
          <span>
            {appendPostPosition(monster.monsterName)
              ? `${monster.monsterName}은`
              : `${monster.monsterName}는`}
          </span>
        </Title>
        <Title>얼마나 실천을 했을까요?</Title>
      </TitleWrapper>

      <ThumbnailWrapper
        onClick={handleMonsterClick}
        animation={animation}
        id={monster.monsterId}
        heightShrinked={heightShrinked}
      >
        <MonsterThumbnail id={monster.monsterId} />
      </ThumbnailWrapper>
      <ExpContainer>
        <ExpText>
          <MonsterLevel>lv.{monster.monsterLevel}</MonsterLevel>
          <Exp>
            {monster.monsterExpPoint}
            <span>%</span>
          </Exp>
        </ExpText>
        <GuageBar>
          <Gauge percentage={monster.monsterExpPoint} />
        </GuageBar>
      </ExpContainer>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          blurmode={true}
        >
          <BottomDialog
            type="levelUp"
            height="308px"
            level={monster.monsterLevel}
            onActive={() => setModalOpen(false)}
            title="LEVEL UP!"
            activeButtonText="확인"
            description={levelUpMessage}
          />
        </Modal>
      )}
      {maxLevelModalOpen && (
        <Modal
          open={maxLevelModalOpen}
          onClose={() => setMaxLevelModalOpen(false)}
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
              setMaxLevelModalOpen(false);
            }}
          />
        </Modal>
      )}
    </MonsterContainer>
  );
};

const MonsterContainer = styled.div`
  width: 100%;
  background: #1e135c;
  padding: 0px 24px;
  position: relative;
  height: fit-content;
  max-height: 434px;
  background: url(${({ level }) => mainBackground[level]}) center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: ${({ heightShrinked }) =>
    heightShrinked ? '0 -160px' : ''};
  transition: all 300ms ease-in-out 50ms;
`;

const TitleWrapper = styled.div`
  line-height: ${({ heightShrinked }) => (heightShrinked ? '0' : '1rem')};
  height: ${({ heightShrinked }) => (!heightShrinked ? '64px' : '0')};
  overflow: ${({ heightShrinked }) => (!heightShrinked ? 'auto' : 'hidden')};
  margin-top: ${({ heightShrinked }) => (!heightShrinked ? '24px' : '0')};

  transition: all 300ms ease-in-out 50ms;

  & > p {
    opacity: ${({ heightShrinked }) => (!heightShrinked ? '1' : '0')};
    transition: opacity 50ms ease-in-out;
  }
`;

const Title = styled.p`
  font-family: var(--font-name-apple);
  font-size: var(--font-xxl);
  line-height: 32px;
  color: var(--color-primary);

  & span {
    font-weight: var(--weight-bold);
  }
`;

const upAndDown = keyframes`
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(12.5px) scale(1.1);
  }

  50% {
    transform: translateY(0px) scale(1.1);
  }

  75% {
    transform: translateY(-12.5px) scale(1.1);
  }

  100% {
    transform: translateY(0px);
  }
`;

const ThumbnailWrapper = styled.div`
  width: ${({ id }) => (id === 25 ? 'calc(100% - 24px)' : '152px')};
  height: ${({ id }) => (id === 25 || id === 30 ? 'auto' : '152px')};
  padding: ${({ id }) => (id % 5 !== 1 && id % 5 !== 2 ? '0px' : '29px')};
  margin: 0 auto;
  margin-top: ${({ heightShrinked }) => (heightShrinked ? '-24px' : '24px')};

  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;

  left: ${({ id }) =>
    id === 12 || id === 14
      ? '-5px'
      : id === 10 || id === 15 || id === 18 || id === 19 || id === 20
      ? '5px'
      : id === 29
      ? '29px'
      : '0px'};
  bottom: ${({ id }) =>
    id === 25 ? '5px' : id === 30 ? '20px' : id === 18 ? '-10px' : '0px'};

  animation: ${({ animation }) => animation && upAndDown} linear 500ms 2
    forwards;
  transition: all 250ms ease-in-out 50ms;
`;

const ExpContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  position: relative;
  top: -14px;
`;

const ExpText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 6px;
`;

const MonsterLevel = styled.span`
  margin-bottom: 6px;
  font-family: var(--font-name-apple);
  font-size: var(--font-xs);
  font-weight: var(--weight-semi-bold);
  line-height: 17px;
  ${whiteOpacity('0.8')};
`;

const Exp = styled.p`
  font-family: var(--font-name-apple);
  font-size: var(--font-xxxxl);
  font-weight: var(--weight-regular);
  color: var(--color-primary);
  line-height: 53px;

  & span {
    font-size: var(--font-xs);
    line-height: 17px;
    margin-left: 4px;
    opacity: 0.8;
  }
`;

const GuageBar = styled.div`
  height: 6px;
  background-color: rgb(90, 90, 90, 0.6);
  border-radius: var(--border-radius-semi);
`;

const Gauge = styled.div`
  width: ${(props) => `${props.percentage}%`};
  height: 6px;
  background-color: var(--color-primary);
  border-radius: var(--border-radius-semi);
  transition: all 150ms ease-in;
`;

export default MainMonster;
