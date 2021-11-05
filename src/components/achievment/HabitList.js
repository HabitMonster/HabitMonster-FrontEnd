import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SampleCategory } from '../../assets/images/main';
import { HabitItems } from './index';

const HabitList = ({ habitList }) => {
  return (
    <>
      {/* <HabitItems /> */}
      {habitList.map((habit) => {
        return <HabitItems key={habit.habitId} habit={habit} />;
      })}
    </>
  );
};

export default HabitList;

const CardWrap = styled.div`
  justify-content: space-between;
  /* width: 100%; */
  width: 360px;
  height: 80px;
  padding: 14px 16px;
  background-color: var(--color-white);
  border-radius: calc(var(--size-border-radius) * 2);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
  box-sizing: border-box;
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

HabitList.propTypes = {
  habitList: PropTypes.array.isRequired,
};
