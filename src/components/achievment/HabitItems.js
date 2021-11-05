import React from 'react';
import styled from 'styled-components';

import { SampleCategory } from '../../assets/images/main';

const HabitItems = () => {
  return (
    <CardWrap>
      <CategoryWrap>
        <Icon />
        <HabitTitles>30분씩 걷기! 운동하자!!</HabitTitles>
        {/* <HabitTitles>{}</HabitTitles> */}
      </CategoryWrap>
      <ProgressBar>
        <ProgressBarGauge />
      </ProgressBar>
      <TextWrap>
        <Period>40번 중 40번 완료</Period>
        <Period>2021.10.21 - 2021.12.24</Period>
      </TextWrap>
    </CardWrap>
  );
};

export default HabitItems;

const CardWrap = styled.div`
  justify-content: space-between;
  width: 360px;
  height: 80px;
  padding: 14px 16px;
  background-color: var(--color-white);
  border-radius: calc(var(--size-border-radius) * 2);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const CategoryWrap = styled.div`
  display: flex;
  align-items: center;
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
  font-family: Apple SD Gothic Neo B;
  font-size: var(--font-micro);
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
  background-color: var(--color-gauge);
  border-radius: var(--border-radius-progress);
`;

const Period = styled.p`
  width: 256px;
  height: 14px;
  margin-bottom: 7px;
  font-family: Apple SD Gothic Neo L;
  font-size: var(--font-nano);
`;
