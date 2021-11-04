import React, { useEffect } from 'react';
import styled from 'styled-components';

import { LeftIcon, RightIcon } from '../assets/icons/common/index';
import { HabitList } from '../components/achievment';
import { statisticApi } from '../api/index';

const Achievement = () => {
  const date = new window.Date();
  const fullYear = date.getFullYear();
  const month = date.getMonth();
  const currentDate = `${fullYear}-${month}`;

  useEffect(() => {
    statisticApi.getStatistics(currentDate);
  }, []);

  return (
    <AcheiveContainer>
      <NavButtonWrap>
        <NavButtonItem>
          <NavButton>월간 통계</NavButton>
        </NavButtonItem>
        <NavButtonItem>
          <NavButton>몬스터 도감</NavButton>
        </NavButtonItem>
      </NavButtonWrap>
      <DetailWrap>
        <DateWrap>
          <DateButton>&lt;</DateButton>
          <Date>{currentDate}</Date>
          <DateButton>&gt;</DateButton>
        </DateWrap>

        <DetailList>
          <ListItem>
            <Title>전체</Title>
            <Text>99개</Text>
          </ListItem>
          <ListItem>
            <Title>완료</Title>
            <Text>99개</Text>
          </ListItem>
          <ListItem>
            <Title>미완료</Title>
            <Text>99개</Text>
          </ListItem>
        </DetailList>
      </DetailWrap>
      <ListContainer>
        <HabitList />
      </ListContainer>
    </AcheiveContainer>
  );
};

export default Achievement;

const AcheiveContainer = styled.div`
  font-family: var(--font-name-apple);
  width: 100%;
  /* margin: 0 auto; */
`;

const NavButtonWrap = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavButtonItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  list-style: none;
  width: 50%;
  /* min-height: 40px; */
  position: relative;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  font-size: 14px;
  font-weight: 700px;
  color: #999999;
  &:hover {
    cursor: pointer;
    color: #7057fc;
    border-bottom: 3px solid #7057fc;
  }
  &:active {
    cursor: pointer;
    color: #7057fc;
    border-bottom: 3px solid #7057fc;
  }
`;

const ListContainer = styled.div`
  height: 100%;
`;

const DetailWrap = styled.div``;
const DateWrap = styled.div`
  background-color: #f8f8f8;
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
  padding: 10px;
`;

const Date = styled.p`
  margin: 0 20px;
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
  list-style: none;
  width: calc(100% / 3);
  min-height: 60px;
  position: relative;

  &::after {
    content: '';
    background-color: #ffffff;
    position: absolute;
    width: 1px;
    height: 30px;
    right: -3px;
    bottom: 10px;
    z-index: 1;
  }

  &:last-child {
    &::after {
      display: none;
    }
  }
`;

const Title = styled.p`
  font-size: 13px;
  text-align: center;
  line-height: 16px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 20px;
  text-align: center;
  line-height: 24px;
  color: #ffffff;
`;
