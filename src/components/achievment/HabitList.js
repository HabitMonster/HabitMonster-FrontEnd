import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { HabitItems } from './';

import { setFlexStyles } from '../../styles';

const HabitList = ({ habitList }) => {
  return (
    <HabitContainer>
      <HabitListWrap>
        {habitList.map((habit, index) => {
          return <HabitItems key={index} habit={habit} />;
        })}
      </HabitListWrap>
    </HabitContainer>
  );
};

export default HabitList;

HabitList.propTypes = {
  habitList: PropTypes.array.isRequired,
};

const HabitContainer = styled.div`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  })}
  padding: 0 16px;
`;

const HabitListWrap = styled.div`
  ${setFlexStyles({
    display: 'flex',
    flexDirection: 'column',
  })}
  width: 100%;
`;
