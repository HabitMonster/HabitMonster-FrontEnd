import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setFontStyles, setFlexStyles } from '../../styles';

const HabitItems = ({ habit }) => {
  const goalTitle = habit.success ? '완료' : '미완료';

  return (
    <CardWrap>
      <CardHeader>
        <GoalTitle success={habit.success}>{goalTitle}</GoalTitle>
        <TitleWrap>
          <p>{habit.title}</p>
          <Percent success={habit.success}>{habit.achievement}%</Percent>
        </TitleWrap>
      </CardHeader>
      <ProgressBar>
        <ProgressBarGauge achievementPercentage={habit.achievement} />
      </ProgressBar>
      <TextWrap>
        <Period>
          {habit?.accomplishCount ?? 0}/{habit?.goalCount ?? 0}
        </Period>
        <Period>
          {habit.startDate} - {habit.endUPDate}
        </Period>
      </TextWrap>
    </CardWrap>
  );
};

HabitItems.propTypes = {
  habit: PropTypes.object.isRequired,
};

export default HabitItems;

const CardWrap = styled.div`
  width: 100%;
  height: 128px;
  padding: 16px 22px;
  background-color: var(--bg-primary);
  border-radius: 12px;
  margin-bottom: 20px;
`;

const CardHeader = styled.div`
  margin-bottom: 20px;
`;

const GoalTitle = styled.p`
  ${({ success }) =>
    setFontStyles({
      customColor: success ? '#8E72CA' : '#EF2F68',
      fontSize: 'xs',
    })}
  margin-bottom: 10px;
`;
const TitleWrap = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  ${setFontStyles({
    color: 'white',
    fontSize: 'xxl',
  })}
`;

const Percent = styled.p`
  ${({ success }) =>
    setFontStyles({
      color: success ? 'primary' : 'danger',
      fontSize: 'm',
      fontWeight: 'bold',
    })}
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--color-progressbar);
  border-radius: var(--border-radius-progress);
`;

const ProgressBarGauge = styled.div`
  width: ${({ achievementPercentage }) => achievementPercentage}%;
  height: 8px;
  background-color: var(--color-main);
  border-radius: var(--border-radius-progress);
`;

const TextWrap = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  margin-top: 10px;

  p {
    &:last-child {
      text-align: right;
    }
  }
`;

const Period = styled.p`
  ${setFontStyles({
    color: 'primary',
    fontSize: 'xxs',
    lineHeight: '14px',
  })}
  margin-bottom: 7px;
  opacity: 0.6;
`;
