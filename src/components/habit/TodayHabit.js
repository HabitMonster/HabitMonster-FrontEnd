import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  habitTitleSelector,
  habitCategorySelector,
  habitDurationSelector,
} from '../../recoil/states/habit';

import { monsterSectionShirnkToggler } from '../../recoil/states/ui';

import { HabitCardItem, HabitCard, TodayHabitCheckoutButton } from '.';

import { miniThrottle } from '../../utils/event';

const TodayHabit = ({ id, parent }) => {
  const title = useRecoilValue(habitTitleSelector(id));
  const category = useRecoilValue(habitCategorySelector(id));
  const { start, end } = useRecoilValue(habitDurationSelector(id));
  const [shrink, setShrink] = useRecoilState(monsterSectionShirnkToggler);

  const history = useHistory();

  const scroller = useRef(null);
  const previousParentScrollTop = useRef(null);

  useEffect(() => {
    const { current } = scroller;

    if (!current || shrink) {
      return;
    }

    const parentElement = parent.current;

    const initializeParentScrollTop = () => {
      previousParentScrollTop.current = parentElement.scrollTop;
    };

    const getDifferenceOfScrollTop = miniThrottle(() => {
      const { current: previous } = previousParentScrollTop;
      const { scrollTop: current } = parentElement;

      if (current - previous >= 10) {
        setShrink(true);
        parentElement.removeEventListener(
          'touchstart',
          initializeParentScrollTop,
        );
        parentElement.removeEventListener(
          'touchmove',
          getDifferenceOfScrollTop,
        );
      }
    }, 25);

    const calculateScrollShirnk = miniThrottle(() => {
      if (parentElement.scrollTop >= 10) {
        setShrink(true);
        parentElement.removeEventListener('scroll', calculateScrollShirnk);
      }
    }, 25);

    if (isMobile) {
      parentElement.addEventListener('touchstart', initializeParentScrollTop);
      parentElement.addEventListener('touchmove', getDifferenceOfScrollTop);
      return;
    }

    parentElement.addEventListener('scroll', calculateScrollShirnk);

    return () => {
      if (isMobile) {
        parentElement.removeEventListener(
          'touchstart',
          initializeParentScrollTop,
        );
        parentElement.removeEventListener(
          'touchmove',
          getDifferenceOfScrollTop,
        );
        return;
      }

      parentElement.removeEventListener('scroll', calculateScrollShirnk);
    };
  }, [setShrink, shrink, parent]);

  return (
    <HabitCard ref={scroller} onClick={() => history.push(`/habit/${id}`)}>
      <HabitCardItem
        habitId={id}
        category={category}
        title={title}
        durationStart={start}
        durationEnd={end}
      />
      <TodayHabitCheckoutButton id={id} />
    </HabitCard>
  );
};

TodayHabit.propTypes = {
  id: PropTypes.number.isRequired,
  parent: PropTypes.object,
};

export default TodayHabit;
