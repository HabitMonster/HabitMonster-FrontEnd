import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { habitStateWithId } from '../../recoil/states/habit';

import { HabitCardItem, HabitCard, TodayHabitCheckoutButton } from '.';

import useShrinkEffect from '../../hooks/useShrinkEffect';

const TodayHabit = ({ id, parent }) => {
  const { title, category, durationStart, durationEnd, isAccomplished } =
    useRecoilValue(habitStateWithId(id));

  const scroller = useShrinkEffect(parent);
  const history = useHistory();

  return (
    <HabitCard ref={scroller} onClick={() => history.push(`/habit/${id}`)}>
      <HabitCardItem
        habitId={id}
        category={category}
        title={title}
        durationStart={durationStart}
        durationEnd={durationEnd}
      />
      <TodayHabitCheckoutButton id={id} isAccomplished={isAccomplished} />
    </HabitCard>
  );
};

TodayHabit.propTypes = {
  id: PropTypes.number.isRequired,
  parent: PropTypes.object,
};

export default TodayHabit;
