import React, { memo, useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

import { habitState, habitsState } from '../../recoil/states/habit';
import { monsterState } from '../../recoil/states/monster';
import { setFormattedDuration } from '../../utils/setFormatDuration';
import CategoryImage from '../../assets/images/habit';

import { habitApis } from '../../api';
import { mainApis } from '../../api';
import { OK } from '../../constants/statusCode';

const TodayHabit = ({ id }) => {
  const history = useHistory();
  const habitDetail = useRecoilValue(habitState(id));
  const setHabitList = useSetRecoilState(habitsState);
  const setMonster = useSetRecoilState(monsterState);
  const [active, setActive] = useState(false);

  const durationStart = setFormattedDuration(
    habitDetail.durationStart,
    'MD',
    '.',
  );
  const durationEnd = setFormattedDuration(habitDetail.durationEnd, 'MD', '.');

  const clickHandler = async (e) => {
    e.stopPropagation();
    setActive((prev) => !prev);

    setTimeout(() => {
      setActive((prev) => !prev);
    }, 300);

    try {
      const { data } = await habitApis.checkHabit(id);
      if (data.statusCode === OK) {
        setHabitList((prev) => {
          const copy = prev.slice();
          const index = prev.findIndex((habit) => habit.habitId === id);
          copy[index] = data.habit;
          return copy;
        });

        if (data.habit.isAccomplished) {
          try {
            const { data } = await mainApis.getMonsterInfo();
            setTimeout(() => {
              setMonster(data.monster);
            }, 500);
          } catch (error) {
            console.error(error);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onHabitClicked = () => {
    history.push(`/habit/${id}`);
  };

  return (
    <>
      <Card onClick={onHabitClicked}>
        <DetailContainer>
          <CategoryIcon category={habitDetail.category} />
          <Info>
            <HabitTitle>{habitDetail.title}</HabitTitle>
            <Period>
              {durationStart}~{durationEnd}
            </Period>
          </Info>
          <CountContainer>
            <Count>
              {habitDetail.current}/{habitDetail.count}
            </Count>
          </CountContainer>
        </DetailContainer>
        <CheckBtn
          active={active}
          isDone={habitDetail.isAccomplished}
          disabled={habitDetail.isAccomplished}
          onClick={clickHandler}
        >
          {habitDetail.isAccomplished ? '이미 완료!' : '완료하기'}
        </CheckBtn>
      </Card>
    </>
  );
};

TodayHabit.propTypes = {
  id: PropTypes.number.isRequired,
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 24px 24px 17px;
  margin-bottom: 16px;
  font-family: var(--font-name-apple);
  background-color: var(--bg-primary);
  color: var(--color-primary);
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 1;
`;

const DetailContainer = styled.div`
  display: flex;
  align-self: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

const CategoryIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 13px;
  background-image: url(${(props) => CategoryImage[props.category].src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  /* height: 42px; */
`;

const HabitTitle = styled.span`
  line-height: 19.2px;
  font-size: var(--font-m);
  font-weight: var(--weight-bold);
`;

const Period = styled.p`
  width: 256px;
  height: 14px;
  font-size: var(--font-xxs);
  font-weight: var(--weight-regular);
  opacity: 0.6;
`;

const CountContainer = styled.div`
  width: 28px;
  height: 17px;
`;

const Count = styled.span`
  line-height: 16.8px;
  font-family: var(--font-name-apple);
  font-size: var(--font-xs);
  font-weight: var(--weight-semi-bold);
`;

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

const finishAnimation = keyframes`
  0% {
    background: #3B0A9D;
  }
  100% {
    background: #000;
  }
`;

const CheckBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 264px;
  height: 40px;
  margin: 16px auto 0 auto;
  background-color: var(--bg-active);
  font-size: var(--font-xs);
  color: ${({ isDone }) =>
    isDone ? 'var(--color-primary-deemed)' : 'var(--color-primary)'};
  border: none;
  border-radius: 4px;
  z-index: 5;
  cursor: pointer;
  animation: ${({ active, isDone }) =>
    isDone
      ? css`
          ${finishAnimation} 300ms linear forwards
        `
      : active
      ? css`
          ${updateAnimation} 300ms linear forwards
        `
      : 'none'};
`;

export default memo(TodayHabit);
