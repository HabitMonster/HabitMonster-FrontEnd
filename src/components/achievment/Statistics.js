import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { fontSize } from '../../styles';

import { statisticApi } from '../../api';

import { formatMonth, addMonths, subMonths } from '../../utils/date';

import { AchieveLeft, AchieveRight } from '../../assets/icons/achievement';

import { HabitList, CircleProgress } from '.';
import { authState } from '../../recoil/states/auth';
import { useRecoilValue } from 'recoil';

const Statistics = () => {
  const setAuth = useRecoilValue(authState);
  const [currentDate, setCurrentDate] = useState(
    formatMonth(new window.Date(), '-'),
  );
  const currentMonth = new Date(currentDate).getMonth() + 1;
  const createAtMonth = new Date(setAuth.createdAt).getMonth() + 1;

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

  const currentList = getCurrentList(statisticData?.habitList ?? []);
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
            isActive={createAtMonth === currentMonth}
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
          {/* TODO: onClick type 지정필요 */}
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
        {currentList.length > 0 ? (
          <HabitList habitList={currentList} />
        ) : (
          <div>데이터 없다!</div>
        )}
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
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 20px 0; */
  margin-top: 24px;
  margin-bottom: 32px;
`;

const DateButton = styled.button`
  pointer-events: ${(props) => (props.isActive ? 'none' : 'auto')};
  background-color: transparent;
  color: #999999;
  border: 0;
  cursor: pointer;
  outline: 0;
  height: 19px;
`;

const DateText = styled.p`
  color: var(--color-primary);
  ${fontSize('18px')};
  font-weight: var(--font-weight-medium);
  margin: 0 15px;
`;

const CircleWrap = styled.div`
  width: 130px;
  height: 130px;
`;

const GoalWrap = styled.div`
  color: white;
  display: flex;
  align-items: center;
`;

const GoalBox = styled.div`
  color: white;
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
      ${fontSize('24px')};
      color: var(--color-primary);
    }
  }
  &:first-child {
    border-bottom: 1px solid rgba(248, 248, 248, 0.1);
  }
`;

const GoalText = styled.span`
  color: rgba(248, 248, 248, 0.6);
  ${fontSize('12px')};
  width: 50%;
  display: inline-block;
`;

const ListContainer = styled.div`
  height: 100%;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 16px;
  margin: 16px 0px;
`;

const HabitsList = styled.p`
  ${fontSize('18px')};
  font-weight: var(--weight-regular);
  line-height: 22px;
  color: var(--color-primary);
  margin: 0 24px;
`;

const AchieveNavBtn = styled.button`
  width: 78px;
  height: 32px;
  border: 1px solid rgba(248, 248, 248, 0.3);
  border-radius: 15px;
  background-color: ${(props) =>
    !props.isActive ? 'transparent' : 'var(--bg-selected)'};
  color: ${(props) =>
    !props.isActive ? 'var(--color-primary)' : 'var(--color-primary)'};
  ${fontSize('14px')};
  line-height: 16px;
  cursor: pointer;
  margin: 10px 0;
  padding: 0 8px;
  span {
    color: ${(props) =>
      !props.isActive ? 'var(—color-statistics)' : 'var(—color-white)'};
    font-size: 15px;
    font-weight: var(—weight-bold);
  }
  & + button {
    margin-left: 6px;
  }
`;
export default Statistics;
