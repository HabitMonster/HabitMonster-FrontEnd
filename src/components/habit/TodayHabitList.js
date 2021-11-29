import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { habitIdListState } from '../../recoil/states/habit';

import { TodayHabit, NoHabitHelper } from './';
import { disappearScrollbar } from '../../styles/Mixin';

const TodayHabitList = ({ webViewWrapper }) => {
  const habitIdList = useRecoilValue(habitIdListState);
  const parent = useRef(null);

  return (
    <HabitContainer ref={parent}>
      {habitIdList.length ? (
        habitIdList.map((id) => (
          <TodayHabit
            webViewWrapper={webViewWrapper}
            parent={parent}
            key={id}
            id={id}
          />
        ))
      ) : (
        <NoHabitHelper />
      )}
    </HabitContainer>
  );
};

TodayHabitList.propTypes = {
  webViewWrapper: PropTypes.object,
};

const HabitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 0 24px;
  margin-top: 24px;

  border-radius: var(--border-radius-semi);
  overflow-y: scroll;
  ${disappearScrollbar()};
`;

export default TodayHabitList;
