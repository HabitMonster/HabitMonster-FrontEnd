import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';

import {
  currentDateState,
  currentListNameState,
  getStatistic,
} from '../../recoil/states/statistic';

import { formatMonth, addMonths, subMonths } from '../../utils/date';

import { AchieveLeft, AchieveRight } from '../../assets/icons/achievement';

import { HabitList, CircleProgress } from './';

const Statistics = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [currentListName, setCurrentListName] =
    useRecoilState(currentListNameState);
  const statisticLoadable = useRecoilValueLoadable(getStatistic);

  const handleClickChangeMonth = (type) => {
    let newDate = formatMonth(subMonths(new Date(currentDate), 1), '-');

    if (type === 'add') {
      newDate = formatMonth(addMonths(new Date(currentDate), 1), '-');
    }

    console.log('newDate', newDate);
    setCurrentDate(newDate);
  };

  const handleClickChangeTabName = (listName) => {
    setCurrentListName(listName);
  };

  // 현재 탭에 해당하는 리스트 세팅하기
  const getCurrentList = (successList, failedList) => {
    switch (currentListName) {
      case 'total':
        return [...successList, ...failedList];
      case 'success':
        return [...successList];
      case 'failed':
        return [...failedList];
      default:
        return [];
    }
  };

  switch (statisticLoadable.state) {
    case 'loading':
      return <div>loading...</div>;
    case 'hasValue':
      console.log('statisticLoadable', statisticLoadable);
      const {
        totalCount,
        succeededCount,
        failedCount,
        successList,
        failedList,
      } = statisticLoadable?.contents;
      const currentList = getCurrentList(successList, failedList);
      const circleValue = totalCount > 0 ? succeededCount / totalCount : 0;

      return (
        <>
          <DetailWrap>
            <DateWrap>
              <DateButton onClick={() => handleClickChangeMonth('minus')}>
                <AchieveLeft />
              </DateButton>
              <DateText>{currentDate}</DateText>
              <DateButton onClick={() => handleClickChangeMonth('add')}>
                <AchieveRight />
              </DateButton>
            </DateWrap>
            {/* TODO: Circle Progress bar */}
            <CircleWrap>
              <CircleProgress
                width={130}
                height={130}
                title={'달성률'}
                value={0.6}
              />
            </CircleWrap>
            {/* 프로그레스바 변형 전 작업 물 백업을 위한 주석 처리 */}
            {/* <DetailList>
              <ListItem>
                <ListTitle>전체</ListTitle>
                <ListText>{totalCount}개</ListText>
              </ListItem>
              <ListItem>
                <ListTitle>완료</ListTitle>
                <ListText>{succeededCount}개</ListText>
              </ListItem>
              <ListItem>
                <ListTitle>미완료</ListTitle>
                <ListText>{failedCount}개</ListText>
              </ListItem>
            </DetailList> */}
          </DetailWrap>
          <ListContainer>
            <ButtonWrap>
              {/* TODO: onClick type 지정필요 */}
              <AchieveNavBtn
                isActive={currentListName === 'total'}
                onClick={() => handleClickChangeTabName('total')}
              >
                전체 <span>{totalCount}</span>
              </AchieveNavBtn>
              <AchieveNavBtn
                isActive={currentListName === 'success'}
                onClick={() => handleClickChangeTabName('success')}
              >
                완료 <span>{succeededCount}</span>
              </AchieveNavBtn>
              <AchieveNavBtn
                isActive={currentListName === 'failed'}
                onClick={() => handleClickChangeTabName('failed')}
              >
                미완료 <span>{failedCount}</span>
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
    case 'hasError':
      throw statisticLoadable.contents;
  }
};

export default Statistics;

const DetailWrap = styled.div`
  background-color: var(--color-white);
  padding: 0 34px 40px;
`;
const DateWrap = styled.div`
  color: var(--color-grey01);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

const DateButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline: 0;
  height: 19px;
`;

const DateText = styled.p`
  font-size: var(--font-small);
  font-weight: var(--weight-bold);
  margin: 0 15px;
`;

const CircleWrap = styled.div`
  width: 130px;
  height: 130px;
  margin: 0 auto;
`;

const DetailList = styled.ul`
  background-color: var(--color-main);
  border-radius: 12px;
  display: flex;
  list-style: none;
  /* width: 292px;
  height: 83px; */
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  color: var(--color-white);
  list-style: none;
  width: calc(100% / 3);
  min-height: 83px;
  padding: 16px 0;
  position: relative;

  &::after {
    content: '';
    background-color: rgba(255, 255, 255, 0.4);
    position: absolute;
    width: 1px;
    height: 21px;
    right: 0;
    bottom: 21px;
    z-index: 1;
  }

  &:last-child {
    &::after {
      display: none;
    }
  }
`;

const ListContainer = styled.div`
  height: 100%;
`;

// const ListTitle = styled.p`
//   font-size: 13px;
//   text-align: center;
//   margin-bottom: 8px;
// `;

// const ListText = styled.p`
//   font-size: 20px;
//   font-weight: 700;
//   text-align: center;
//   line-height: 24px;
// `;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 24px 16px;
`;

const AchieveNavBtn = styled.button`
  border: 1px solid ${(props) => (!props.isActive ? '#f0eff8' : '#492cf1')};
  border-radius: 14px;
  background-color: ${(props) => (!props.isActive ? 'transparent' : '#492cf1')};
  color: ${(props) =>
    !props.isActive ? 'var(--color-grey01)' : 'var(--color-white)'};
  /* height: 26px; */
  font-size: var(--font-micro);
  line-height: 18px;
  cursor: pointer;
  margin: 10px 0;
  padding: 4px 10px;

  span {
    color: ${(props) => (!props.isActive ? '#492cf1' : 'var(--color-white)')};
    font-size: 15px;
    font-weight: var(--weight-bold);
  }

  & + button {
    margin-left: 6px;
  }
`;
