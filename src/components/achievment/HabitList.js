import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { HabitItems } from './index';

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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  padding: 0 16px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const HabitListWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
