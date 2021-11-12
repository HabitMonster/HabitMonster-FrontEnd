import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fontSize } from '../../styles';
import { SampleCategory } from '../../assets/images/main';
import { habitState } from '../../recoil/states/habit';
import Achievement from '../../pages/Achievement';

const HabitItems = ({ habit }) => {
  const {
    title,
    startDate,
    endUPDate,
    success,
    accomplishCount,
    goalCount,
    archievement,
  } = habit;

  return (
    <CardWrap>
      <ResultText>{success ? '완료' : '미완료'}</ResultText>
      <CategoryWrap>
        <HabitTitles>{title}</HabitTitles>
        <HabitTitles>{archievement ? `${archievement}%` : '0%'}</HabitTitles>
      </CategoryWrap>

      <ProgressBar>
        <ProgressBarGauge />
      </ProgressBar>
      <TextWrap>
        <Period>
          {!goalCount ? '0' : goalCount} / {accomplishCount}
        </Period>
        <Period>
          {startDate} ~ {endUPDate}
        </Period>
      </TextWrap>
    </CardWrap>
  );
};

export default HabitItems;

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 312px;
  height: 128px;
  padding: 14px 16px;
  background-color: #1e2025;
  border-radius: 12px;
  margin: 6px auto;
  box-sizing: border-box;
`;

const ResultText = styled.span`
  color: #8e72ca;
  ${fontSize('12px')};
  line-height: 14px;
  font-weight: var(--weight-regular);
`;

const CategoryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HabitTitles = styled.p`
  ${fontSize('16px')};
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  line-height: 19px;
`;

const TextWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  width: 280px;
  height: 8px;
  background-color: var(--color-progressbar);
  border-radius: var(--border-radius-progress);
  margin: 15px 0;
`;

const ProgressBarGauge = styled.div`
  width: 39px;
  height: 8px;
  background-color: #ef2f68;
  border-radius: var(--border-radius-progress);
`;

const Period = styled.p`
  ${fontSize('12px')};
  line-height: 14px;
  color: var(--color-primary);
`;

HabitItems.propTypes = {
  habit: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endUPDate: PropTypes.string,
  success: PropTypes.bool.isRequired,
  accomplishCount: PropTypes.number.isRequired,
  archievement: PropTypes.number.isRequired,
};
