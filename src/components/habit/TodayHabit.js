import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';

import { Toast } from '../common';
import { monsterSectionShirnkToggler } from '../../recoil/states/ui';

import { habitStateWithId } from '../../recoil/states/habit';
import { monsterState } from '../../recoil/states/monster';

import { mainApis, habitApis } from '../../api';
import { setFormattedDuration } from '../../utils/setFormatDuration';
import { miniThrottle, miniDebounce } from '../../utils/event';

import { OK } from '../../constants/statusCode';
import CategoryImage from '../../assets/images/habit';

const TodayHabit = ({ id, parent }) => {
  const history = useHistory();
  const setMonster = useSetRecoilState(monsterState);
  const [habitDetail, setHabitDetail] = useRecoilState(habitStateWithId(id));

  const [active, setActive] = useState(false);
  const [activeToast, setActiveToast] = useState(false);

  const durationStart = setFormattedDuration(
    habitDetail.durationStart,
    'MD',
    '.',
  );
  const durationEnd = setFormattedDuration(habitDetail.durationEnd, 'MD', '.');

  const [shrink, setShrink] = useRecoilState(monsterSectionShirnkToggler);
  const scroller = useRef(null);
  const previousParentScrollTop = useRef(null);

  useEffect(() => {
    const { current } = scroller;

    if (!current || shrink) {
      return;
    }

    const parentElement = parent.current;

    const initializeParentScrollTop = () => {
      previousParentScrollTop.current = parentElement.scrollTop;
    };

    const getDifferenceOfScrollTop = miniThrottle(() => {
      const { current: previous } = previousParentScrollTop;
      const { scrollTop: current } = parentElement;

      if (current - previous >= 10) {
        setShrink(true);
        current.removeEventListener('touchstart', initializeParentScrollTop);
        current.removeEventListener('touchmove', getDifferenceOfScrollTop);
      }
    }, 100);

    if (isMobile) {
      current.addEventListener('touchstart', initializeParentScrollTop);
      current.addEventListener('touchmove', getDifferenceOfScrollTop);
      return;
    }

    parent.current.addEventListener('scroll', (e) => {
      console.log(parent.current.scrollTop);
      console.log(e);
    });

    return () => {
      if (isMobile) {
        current.removeEventListener('touchstart', initializeParentScrollTop);
        current.removeEventListener('touchmove', getDifferenceOfScrollTop);
        return;
      }
    };
  }, [setShrink, shrink, parent]);

  useEffect(() => {
    if (activeToast) {
      setTimeout(() => {
        setActiveToast(false);
      }, 2500);
    }
  }, [activeToast]);

  const clickHandler = miniDebounce(async () => {
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
  }, 100);

  const onHabitClicked = () => {
    history.push(`/habit/${id}`);
  };

  return (
    <>
      <Card onClick={onHabitClicked} ref={scroller}>
        <DetailContainer>
          <div>
            <CategoryIcon category={habitDetail.category} />
            <Info>
              <div>
                <HabitTitle>{habitDetail.title}</HabitTitle>
                <Count>
                  <b>{habitDetail.current}</b>/{habitDetail.count}
                </Count>
              </div>
              <Period>
                {durationStart}~{durationEnd}
              </Period>
            </Info>
          </div>
        </DetailContainer>
        <CheckBtn
          active={active}
          isDone={habitDetail.isAccomplished}
          disabled={habitDetail.isAccomplished}
          onClick={(e) => {
            e.stopPropagation();
            clickHandler();
          }}
        >
          {habitDetail.isAccomplished ? '완료' : '완료하기'}
        </CheckBtn>
      </Card>
      {activeToast && (
        <Toast
          activeToast={activeToast}
          text="오늘의 습관 하나를 완료했어요!"
        />
      )}
    </>
  );
};

TodayHabit.propTypes = {
  id: PropTypes.number.isRequired,
  parent: PropTypes.object,
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  font-family: var(--font-name-apple);
  background-color: var(--bg-primary);
  color: var(--color-primary);
  border-radius: var(--border-radius-semi);
  cursor: pointer;
  margin-bottom: 16px;

  /* &:last-of-type {
    margin-bottom: 89px;
  } */
`;

const DetailContainer = styled.div`
  display: flex;
  width: 100%;

  & > div {
    display: flex;
    align-items: center;
    width: 100%;
  }
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
  width: calc(100% - 43px);
  display: flex;
  flex-direction: column;

  & div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
`;

const HabitTitle = styled.span`
  font-size: var(--font-m);
  line-height: 19.2px;
  font-weight: var(--weight-bold);
`;

const Period = styled.p`
  font-size: var(--font-xxs);
  font-weight: var(--weight-regular);
  opacity: 0.6;
`;

const Count = styled.span`
  line-height: 16.8px;
  font-family: var(--font-name-apple);
  font-size: var(--font-xs);
  font-weight: var(--weight-regular);
  color: var(--color-primary-deemed);

  & b {
    font-weight: var(--weight-semi-bold);
    color: var(--color-primary);
  }
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
  border-radius: var(--border-radius-semi);
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

// export default memo(TodayHabit);

export default TodayHabit;
