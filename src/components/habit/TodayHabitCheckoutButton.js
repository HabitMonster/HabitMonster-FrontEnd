import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import {
  habitStateWithId,
  habitAccomplishCheckSelector,
} from '../../recoil/states/habit';

import { monsterAnimationTogglerState } from '../../recoil/states/ui';
import { monsterState } from '../../recoil/states/monster';

import { Toast } from '../common';

import { habitApis, mainApis } from '../../api';
import { miniDebounce } from '../../utils/event';
import { OK } from '../../constants/statusCode';

const TodayHabitCheckoutButton = ({ id }) => {
  const isAccomplished = useRecoilValue(habitAccomplishCheckSelector(id));
  const [active, setActive] = useState(false);
  const [activeToast, setActiveToast] = useState(false);
  const [animation, setAnimation] = useRecoilState(
    monsterAnimationTogglerState,
  );
  const setHabitDetail = useSetRecoilState(habitStateWithId(id));
  const setMonster = useSetRecoilState(monsterState);

  const handleCompleteButtonClick = miniDebounce(async () => {
    setActive((prev) => !prev);

    try {
      setTimeout(() => {
        setActive((prev) => !prev);
      }, 150);
      const { data } = await habitApis.checkHabit(id);
      if (data.statusCode === OK) {
        setHabitDetail(data.habit);

        if (data.habit.isAccomplished) {
          setActiveToast(true);
          try {
            const { data } = await mainApis.getMonsterInfo();

            if (data.statusCode === OK) {
              setMonster(data.monster);

              if (animation) {
                return;
              }
              setAnimation((prev) => !prev);
              setTimeout(() => {
                setAnimation((prev) => !prev);
              }, 1000);
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, 0);

  useEffect(() => {
    if (activeToast) {
      setTimeout(() => {
        setActiveToast(false);
      }, 2500);
    }
  }, [activeToast]);

  return (
    <>
      <CheckoutButton
        active={active}
        isDone={isAccomplished}
        disabled={isAccomplished}
        onClick={(e) => {
          e.stopPropagation();
          handleCompleteButtonClick();
        }}
      >
        {isAccomplished ? '완료' : '완료하기'}
      </CheckoutButton>
      {activeToast && (
        <Toast
          activeToast={activeToast}
          text="오늘의 습관 하나를 완료했어요!"
        />
      )}
    </>
  );
};

TodayHabitCheckoutButton.propTypes = {
  id: PropTypes.number.isRequired,
};

const updateAnimation = keyframes`
  0% {
    background: #3B0A9D;
  }
  50% {
    background: #2D1C50;
  }
  100% {
    background: #3B0A9D;
  }
`;

const CheckoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 264px;
  height: 40px;
  margin: 16px auto 0 auto;
  background-color: ${({ isDone }) => (isDone ? '#000' : 'var(--bg-active)')};
  font-size: var(--font-xs);
  color: ${({ isDone }) =>
    isDone ? 'var(--color-primary-deemed)' : 'var(--color-primary)'};
  border: none;
  border-radius: var(--border-radius-semi);
  cursor: pointer;
  animation: ${({ active }) =>
    active
      ? css`
          ${updateAnimation} 300ms linear forwards
        `
      : 'none'};
`;

export default TodayHabitCheckoutButton;
