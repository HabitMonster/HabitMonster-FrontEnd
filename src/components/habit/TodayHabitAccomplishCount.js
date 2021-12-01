import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { habitProcessCountById } from '../../recoil/states/habit';

const TodayHabitAccomplishCount = ({ id }) => {
  const { current, count } = useRecoilValue(habitProcessCountById(id));

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
