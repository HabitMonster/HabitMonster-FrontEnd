import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';

import { currentDateState, getStatistic } from '../../recoil/states';

import { addMonths, subMonths } from '../../utils/date';

import { AchieveLeft, AchieveRight } from '../../assets/icons/achievement';

import { HabitList } from './';

const Statistics = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const statisticLoadable = useRecoilValueLoadable(getStatistic);

  const handleClickChangeMonth = (type) => {
    if (type === 'add') {
      setCurrentDate(addMonths(currentDate, 1));
      return;
    }

    setCurrentDate(subMonths(currentDate, 1));
  };

  switch (statisticLoadable.state) {
    case 'loading':
      return <div>loading...</div>;
    case 'hasValue':
      const {
        totalCount,
        succeededCount,
        failedCount,
        successList,
        failedList,
      } = statisticLoadable.contents;
      const totalList = [...successList, ...failedList];

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

            <DetailList>
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
            </DetailList>
          </DetailWrap>
          <ListContainer>
            <ButtonWrap>
              {/* TODO: onClick type 지정필요 */}
              <AchieveNavBtn>전체</AchieveNavBtn>
              <AchieveNavBtn>완료</AchieveNavBtn>
              <AchieveNavBtn>미완료</AchieveNavBtn>
            </ButtonWrap>
            <HabitList />
          </ListContainer>
        </>
      );
    case 'hasError':
      throw statisticLoadable.contents;
  }
};

export default Statistics;

const DetailWrap = styled.div`
  background-color: #f8f8f8;
  padding: 0 34px 40px;
`;
const DateWrap = styled.div`
  color: #131313;
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
  font-size: 16px;
  font-weight: 700;
  margin: 0 15px;
`;

const DetailList = styled.ul`
  background-color: #7057fc;
  border-radius: 12px;
  display: flex;
  list-style: none;
  /* width: 292px;
  height: 83px; */
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  color: #ffffff;
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

const ListTitle = styled.p`
  font-size: 13px;
  text-align: center;
  margin-bottom: 8px;
`;

const ListText = styled.p`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 24px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const AchieveNavBtn = styled.button`
  border: none;
  background: transparent;
  color: #999999;
  width: 49px;
  height: 24px;
  font-size: 14px;
  line-height: 16.8px;
  cursor: pointer;
  margin: 10px 0;
  &:hover {
    background-color: #7057fc;
    border-radius: 12px;
    color: #ffffff;
  }
  &:active {
    background-color: #7057fc;
    border-radius: 12px;
    color: #ffffff;
  }
`;
