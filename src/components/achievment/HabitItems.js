import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HabitItems = ({ habit }) => {
  const goalTitle = habit.success ? '완료' : '미완료';

  return (
    <CardWrap>
      <CardHeader>
        <GoalTitle success={habit.success}>{goalTitle}</GoalTitle>
        <TitleWrap>
          <Title>{habit.title}</Title>
          <Percent success={habit.success}>{habit.achievement}%</Percent>
        </TitleWrap>
      </CardHeader>
      <ProgressBar>
        <ProgressBarGauge rate={habit.achievement} />
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
  justify-content: space-between;
  width: 100%;
  padding: 24px;
  background-color: var(--bg-primary);
  border-radius: calc(var(--size-border-radius) * 2);
  margin-bottom: 20px;
`;

const CardHeader = styled.div`
  margin-bottom: 20px;
`;

const GoalTitle = styled.p`
  color: ${(props) => (props.success ? 'white' : 'red')};
  margin-bottom: 10px;
  font-size: 14px;
`;
const TitleWrap = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 24px;
`;

const Title = styled.p`
  flex: 1 1 0;
`;
const Percent = styled.p`
  color: ${(props) => (props.success ? 'white' : 'red')};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: var(--color-progressbar);
  border-radius: var(--border-radius-progress);
`;

const ProgressBarGauge = styled.div`
  width: ${(props) => `${props.rate}%`};
  height: 10px;
  background-color: var(--color-main);
  border-radius: var(--border-radius-progress);
`;

const TextWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  p {
    &:last-child {
      text-align: right;
    }
  }
`;

const Period = styled.p`
  color: var(—color-layout);
  margin-bottom: 7px;
  font-family: var(—font-name-apple);
  font-size: var(—font-nano);
  font-weight: var(—weight-regular);
  flex: 1;
`;
