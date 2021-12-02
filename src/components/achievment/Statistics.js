import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { defaultAuthSelector } from '../../recoil/states/auth';

import { statisticApi } from '../../api';

import { AchieveLeft, AchieveRight } from '../../assets/icons/achievement';

import { HabitList, CircleProgress } from '.';

import { setFontStyles, setFlexStyles } from '../../styles';

import { formatMonth, addMonths, subMonths } from '../../utils/date';

const Statistics = () => {
  const { createdAt } = useRecoilValue(defaultAuthSelector);
  const [currentDate, setCurrentDate] = useState(
    formatMonth(new window.Date(), '-'),
  );
  const currentMonth = new Date(currentDate).getMonth() + 1;
  const createAtMonth = new Date(createdAt).getMonth() + 1;

  const [currentListName, setCurrentListName] = useState('total');
  const [statisticData, setStatisticData] = useState({
    totalCount: 0,
    succeededCount: 0,
    failedCount: 0,
    habitList: [],
  });

  const getCurrentList = (habitList) => {
    switch (currentListName) {
      case 'success':
        return habitList.filter((habit) => habit.success);
      case 'failed':
        return habitList.filter((habit) => !habit.success);
      default:
        return [...habitList];
    }
  };

  const handleClickChangeMonth = (type) => {
    let newDate = formatMonth(subMonths(new Date(currentDate), 1), '-');

    if (type === 'add') {
      newDate = formatMonth(addMonths(new Date(currentDate), 1), '-');
    }
    setCurrentDate(newDate);
  };

  const handleClickChangeTabName = (listName) => {
    setCurrentListName(listName);
  };

  const getStatistic = useCallback(async () => {
    try {
      const statisticResponse = await statisticApi.getStatistics(currentDate);

      if (statisticResponse.status === 200) {
        const { totalCount, succeededCount, failedCount, habitList } =
          statisticResponse.data;
        setStatisticData({
          totalCount,
          succeededCount,
          failedCount,
          habitList,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentDate]);

  const currentList = getCurrentList(statisticData.habitList);
  const circleValue =
    statisticData?.totalCount > 0
      ? statisticData?.succeededCount / statisticData?.totalCount
      : 0;

  useEffect(() => {
    getStatistic();
  }, [getStatistic]);

  return (
    <>
      <DetailWrap>
        <DateWrap>
          <DateButton
            disabled={createAtMonth === currentMonth}
            onClick={() => handleClickChangeMonth('minus')}
          >
            <AchieveLeft />
          </DateButton>
          <DateText>{currentDate}</DateText>
          <DateButton onClick={() => handleClickChangeMonth('add')}>
            <AchieveRight />
          </DateButton>
        </DateWrap>
        <GoalWrap>
          <CircleWrap>
            <CircleProgress width={130} height={130} value={circleValue} />
          </CircleWrap>
          <GoalBox>
            <GoalCount>
              <GoalText>이번달 목표</GoalText>
              <GoalText>{statisticData.totalCount}</GoalText>
            </GoalCount>
            <GoalCount>
              <GoalText>달성</GoalText>
              <GoalText>{statisticData.succeededCount}</GoalText>
            </GoalCount>
          </GoalBox>
        </GoalWrap>
      </DetailWrap>
      <HabitsList>{currentMonth}월의 습관 목록</HabitsList>
      <ListContainer>
        <ButtonWrap>
          <AchieveNavBtn
            isActive={currentListName === 'total'}
            onClick={() => handleClickChangeTabName('total')}
          >
            전체
          </AchieveNavBtn>
          <AchieveNavBtn
            isActive={currentListName === 'success'}
            onClick={() => handleClickChangeTabName('success')}
          >
            완료
          </AchieveNavBtn>
          <AchieveNavBtn
            isActive={currentListName === 'failed'}
            onClick={() => handleClickChangeTabName('failed')}
          >
            미완료
          </AchieveNavBtn>
        </ButtonWrap>
        {currentList.length > 0 && <HabitList habitList={currentList} />}
      </ListContainer>
    </>
  );
};

const DetailWrap = styled.div`
  background-color: var(--bg-wrapper);
  padding: 0 34px 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(248, 248, 248, 0.1);
`;

const DateWrap = styled.div`
  color: var(--color-grey01);
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  margin-top: 24px;
  margin-bottom: 32px;
`;

const DateButton = styled.button`
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  background-color: transparent;
  color: var(--color-deemed);
  border: 0;
  cursor: pointer;
  outline: 0;
  height: 19px;
`;

const DateText = styled.p`
  ${setFontStyles({
    color: 'primary',
    fontSize: 'l',
    fontWeight: 'medium',
  })}
  margin: 0 15px;
`;

const CircleWrap = styled.div`
  width: 130px;
  height: 130px;
`;

const GoalWrap = styled.div`
  color: white;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
`;

const GoalBox = styled.div`
  color: var(--color-white);
  margin-left: 35px;
  flex: 1;
  & > div:first-child {
    padding-bottom: 19.5px;
  }
`;

const GoalCount = styled.div`
  padding: 12px 0;
  padding-left: 4px;
  span {
    &:last-child {
      text-align: right;
      ${setFontStyles({
        color: 'primary',
        fontSize: 'xxl',
      })}
    }
  }
  &:first-child {
    border-bottom: 1px solid rgba(248, 248, 248, 0.1);
  }
`;

const GoalText = styled.span`
  ${setFontStyles({
    color: 'primary-deemed',
    fontSize: 'xxs',
  })}
  width: 50%;
  display: inline-block;
`;

const ListContainer = styled.div``;

const ButtonWrap = styled.div`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'flex-start',
  })}
  padding: 0 16px;
  margin: 16px 0px;
`;

const HabitsList = styled.p`
  ${setFontStyles({
    color: 'primary',
    fontSize: 'l',
    fontWeight: 'regular',
    lineHeight: '22px',
  })}
  margin: 0 24px;
`;

const AchieveNavBtn = styled.button`
  width: 78px;
  height: 32px;
  border: 1px solid rgba(248, 248, 248, 0.3);
  border-radius: 15px;
  background-color: ${(props) =>
    !props.isActive ? 'transparent' : 'var(--bg-selected)'};
  ${setFontStyles({
    color: 'primary',
    fontSize: 'xs',
    lineHeight: '16px',
  })}
  cursor: pointer;
  margin: 10px 0;
  padding: 0 8px;

  span {
    ${({ isActive }) =>
      setFontStyles({
        color: !isActive ? 'statistics' : 'white',
        fontSize: 's',
        fontWeight: 'bold',
      })}
  }
  & + button {
    margin-left: 6px;
  }
`;
export default Statistics;
