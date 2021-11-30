import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { habitProcessCountSelector } from '../../recoil/states/habit';

const TodayHabitAccomplishCount = ({ id }) => {
  const { current, count } = useRecoilValue(habitProcessCountSelector(id));

  return (
    <>
      <b>{current}</b>/{count}
    </>
  );
};

TodayHabitAccomplishCount.propTypes = {
  id: PropTypes.number.isRequired,
};

export default TodayHabitAccomplishCount;
