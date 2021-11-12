import React from 'react';
import PropTypes from 'prop-types';

import { HabitItems } from './index';

const HabitList = ({ habitList }) => {
  console.log(habitList);
  return (
    <>
      {/* <HabitItems /> */}
      {habitList.map((habit, index) => {
        return <HabitItems key={index} habit={habit} />;
      })}
    </>
  );
};

export default HabitList;

HabitList.propTypes = {
  habitList: PropTypes.array.isRequired,
};
