import React from 'react';
import PropTypes from 'prop-types';

import { HabitItems } from './index';

const HabitList = ({ habitList }) => {
  console.log(habitList);
  return (
    <>
      {habitList.map((habit) => {
        return <HabitItems key={habit.habitId} habit={habit} />;
      })}
    </>
  );
};

export default HabitList;

HabitList.propTypes = {
  habitList: PropTypes.array.isRequired,
};
