import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import {
  habitCurrentAccomplishCountSelector,
  habitTotalAccomplishSelector,
} from '../../recoil/states/habit';

const TodayHabitAccomplishCount = ({ id }) => {
  const current = useRecoilValue(habitCurrentAccomplishCountSelector(id));
  const count = useRecoilValue(habitTotalAccomplishSelector(id));

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
