import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  monsterChangeToggler,
  monsterState,
} from '../../recoil/states/monster';
import {
  monsterSectionShirnkToggler,
  monsterAnimationToggler,
} from '../../recoil/states/ui';

import { mainBackground } from '../../assets/images/background';

import { MonsterThumbnail, Modal } from '../common';
import { BottomDialog } from '../dialog';
import { MonsterSearchSection, LevelUp } from '.';

import { MAX_LEVEL, MAX_EXP } from '../../constants/monster';

import { whiteOpacity, setFontStyles, setFlexStyles } from '../../styles';

import { appendPostPosition } from '../../utils/appendPostPosition';

const MainMonster = () => {
  const monster = useRecoilValue(monsterState);
  const [modalOpen, setModalOpen] = useState(false);
  const [levelUpMessage, setLevelUpMessage] = useState('');

  const [maxLevelModalOpen, setMaxLevelModalOpen] = useState(false);
  const isMaxLevel = useRecoilValue(monsterChangeToggler);

  const previousLevel = useRef(monster.monsterLevel);
  const heightShrinked = useRecoilValue(monsterSectionShirnkToggler);
  const [animation, setAnimation] = useRecoilState(monsterAnimationToggler);

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
  ${setFontStyles({
    color: 'primary',
    fontSize: 'xxl',
    lineHeight: '32px',
  })}

  & span {
    ${setFontStyles({ fontWeight: 'bold' })}
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
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  })}
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
  ${setFlexStyles({
    display: 'flex',
    flexDirection: 'column',
  })}
  padding-bottom: 10px;
  position: relative;
  top: -14px;
`;

const ExpText = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  })}
  margin-bottom: 6px;
`;

const MonsterLevel = styled.span`
  margin-bottom: 6px;
  ${setFontStyles({
    fontSize: 'xs',
    fontWeight: 'semi-bold',
    lineHeight: '17px',
  })}
  ${whiteOpacity('0.8')};
`;

const Exp = styled.p`
  ${setFontStyles({
    color: 'primary',
    fontSize: 'xxxxl',
    fontWeight: 'regular',
    lineHeight: '53px',
  })}

  & span {
    ${setFontStyles({
      fontSize: 'xs',
      lineHeight: '17px',
    })}
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
