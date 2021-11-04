import React, { useState } from 'react';
import styled from 'styled-components';

import { achieveLeft, achieveRight } from '../../assets/icons/achievement';
const MonthlyBox = () => {
  const [currentMonth, setCurrentMonth] = useState('2021-10');

  return (
    <MonthBox>
      {/* <DateBox>
        <achieveLeft />
        <span>{currentMonth}</span>
        <achieveRight />
      </DateBox>
      <MonthContainer>
        <CompletionHabit>
          <StatisticTitle>전체</StatisticTitle>
          <StatisticCount>39개</StatisticCount>
          {/* <StatisticCount>{statistics.successedCount}개</StatisticCount> */}
      {/* </CompletionHabit>
        <CompletionHabit>
          <StatisticTitle>완료</StatisticTitle>
          <StatisticCount>30개</StatisticCount>
        </CompletionHabit>
        <CompletionHabit>
          <StatisticTitle>미완료</StatisticTitle>
          <StatisticCount>9개</StatisticCount>
        </CompletionHabit>  */}
      {/* <CompletionHabit>{statistics}</CompletionHabit> */}

      {/* <CompletionHabit>{statistics.successedCount}</CompletionHabit> */}

      {/* <FailedHabit>{statistics.failedCount}</FailedHabit> */}
      {/* </MonthContainer> */}
    </MonthBox>
  );
};
export default MonthlyBox;

const MonthBox = styled.div`
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

const MonthContainer = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #7057fc;
  border-radius: 12px;
  text-align: center;
  width: 292px;
  height: 83px;
  margin: 0 auto;
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 148px;
  height: 24px;
  top: 107px;
  color: #131313;
`;

const CompletionHabit = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96px;
  border-right: 1px solid #ffffff;
  &:nth-child(3) {
    border: none;
  }
`;

const StatisticTitle = styled.p`
  font-size: 13px;
  text-align: center;
  line-height: 16px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const StatisticCount = styled.p`
  font-size: 20px;
  text-align: center;
  line-height: 24px;
  color: #ffffff;
`;
