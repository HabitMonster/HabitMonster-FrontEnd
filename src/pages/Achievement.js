import React from 'react';
import styled from 'styled-components';

import { LeftIcon, RightIcon } from '../assets/icons/common/index';
import { MonthlyBox, HabitList } from '../components/achievment';

const Achievement = () => {
  return (
    <AcheiveContainer>
      <NavButtonWrap>
        <NavButtonItem>월간 통계</NavButtonItem>
        <NavButtonItem>몬스터 도감</NavButtonItem>
      </NavButtonWrap>
      <DateWrap>
        <MonthlyBox />
      </DateWrap>
      {/* {habitList.map((habit) => {
        return <TodaysHabit key={habit.habitId} habit={habit} />;
      })} */}
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
  margin: 0 auto;
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
  min-height: 40px;
  position: relative;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
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

const DateWrap = styled.div``;

const Text = styled.p`
  font-size: 16px;
`;

const ListContainer = styled.div`
  height: 100%;
`;

const HabitBox = styled.div`
  width: 328px;
  margin: 0 auto;
  border-radius: 11px;
  background-color: #edf2f7;
`;

const Wrap = styled.div``;

const TextButton = styled.button`
  background-color: transparent;
  border: 0;
  border-radius: 3px;
  color: #999999;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  margin: 0 5px;
  padding: 0;
  position: relative;
  min-width: 60px;
  /* height: 40px; */
  line-height: 17px;
  transition: all 0.3s;
  &::after {
    background-color: #7057fc;
    content: '';
    position: absolute;
    height: 2px;
    opacity: 0;
    width: 0;
    left: 0;
    bottom: 0;
    transition: all 0.3s;
  }
  &:hover {
    color: #7057fc;
    &::after {
      width: 100%;
      opacity: 1;
    }
  }
`;

{
  /* <NavButtonWrap>
        <NavButtonItem>
          <TextButton>월간 통계</TextButton>
        </NavButtonItem>
        <NavButtonItem>
          <TextButton>몬스터 도감</TextButton>
        </NavButtonItem>
      </NavButtonWrap>
      <DateWrap>
        <LeftIcon />
        <Text>2021년 12월</Text>
        <RightIcon />
      </DateWrap>
      <BoxWrap>
        <MonthlyBox />
      </BoxWrap>
      <Wrap>
        <TextButton>총 습관</TextButton>
        <TextButton>성공</TextButton>
        <TextButton>실패</TextButton>
      </Wrap>
      <Wrap>
        <HabitBox></HabitBox>
      </Wrap> */
}
