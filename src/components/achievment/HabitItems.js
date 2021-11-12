import React from 'react';
import styled from 'styled-components';

import { SampleCategory } from '../../assets/images/main';
import { fontSize } from '../../styles';

const HabitItems = () => {
  return (
    <CardWrap>
      <span>{success ? '완료' : '미완료'}</span>
      <CategoryWrap>
        <p>{title}</p>
        <p>{archievement}</p>
      </CategoryWrap>
      <ProgressBar>
        <ProgressBarGauge />
      </ProgressBar>
      <TextWrap>
        <Period>{`${accomplishCount}/`}</Period>
        <Period>{`${startDate} - ${endUpDate}`}</Period>
      </TextWrap>
    </CardWrap>
  );
};

export default HabitItems;

const CardWrap = styled.div`
  width: 312px;
  height: 112px;
  padding: 16px 20px;
  background-color: #1e2025;
  border-radius: 12px;
  box-shadow: 0px 0px 4px rgba(125, 123, 138, 0.08);
  margin-bottom: 10px;
  box-sizing: border-box;
  span {
    ${fontSize('12px')};
    line-height: 14px;
  }
`;

const Result = styled.span`
  ${fontSize('12px')};
  line-height: 14px;
`;

const CategoryWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    ${fontSize('16px')};
    line-height: 19px;
    align-items: center;
    font-weight: var(--font-weight-bold);
  }
`;

const Icon = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  background-image: url(${SampleCategory});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const HabitTitles = styled.p`
  width: 212px;
  height: 16px;
  font-family: var(--font-name-apple);
  ${fontSize('16px')};
  line-height: 19px;
  font-weight: var(--weight-bold);
`;

const TextWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  width: 292px;
  height: 8px;
  background-color: var(--color-progressbar);
  border-radius: var(--border-radius-progress);
`;

const ProgressBarGauge = styled.div`
  width: 39px;
  height: 8px;
  background-color: var(--color-main);
  border-radius: var(--border-radius-progress);
`;

const Period = styled.p`
  width: 256px;
  height: 14px;
  margin-bottom: 7px;
  font-family: var(--font-name-apple);
  font-size: var(--font-nano);
  font-weight: var(--weight-regular);
`;
