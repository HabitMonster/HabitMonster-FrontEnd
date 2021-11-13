import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSize } from '../../styles';

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
      {/* <ProgressBar>
        <ProgressBarGauge rate={habit.achievement} />
      </ProgressBar> */}
      <ProgressBar>
        <ProgressBarGauge />
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
  width: 312px;
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
  color: ${(props) => (props.success ? '#8E72CA' : '#EF2F68')};
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
  ${fontSize('16px')};
  font-weight: var(--weight-bold);
  color: ${(props) =>
    props.success ? 'var(--color-primary)' : 'var(--color-danger)'};
`;

// const ProgressBar = styled.div`
//   width: 100%;
//   height: 10px;
//   background-color: var(--color-progressbar);
//   border-radius: var(--border-radius-progress);
// `;

// const ProgressBarGauge = styled.div`
//   width: ${(props) => `${props.rate}%`};
//   height: 10px;
//   background-color: var(--color-main);
//   border-radius: var(--border-radius-progress);
//`;

const ProgressBar = styled.div`
  width: 268px;
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
  color: var(--color-primary);
  margin-bottom: 7px;
  font-family: var(—font-name-apple);
  ${fontSize('12px')};
  opacity: 0.6;
  line-height: 14px;
  flex: 1;
`;
