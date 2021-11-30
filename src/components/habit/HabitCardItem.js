import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { TodayHabitAccomplishCount } from '.';

import CategoryImage from '../../assets/images/category';
import { setFormattedDuration } from '../../utils/setFormatDuration';

const HabitCardItem = ({
  habitId,
  monsterCode,
  category,
  title,
  durationStart,
  durationEnd,
  achievePercentage,
}) => {
  const renderedDuration = habitId
    ? `${durationStart.split('-').slice(1).join('.')} ~ ${durationEnd
        .split('-')
        .slice(1)
        .join('.')}`
    : `${setFormattedDuration(
        durationStart,
        'YMD',
        '.',
      )} ~ ${setFormattedDuration(durationEnd, 'YMD', '.')}`;

  return (
    <Container>
      <div>
        <CategoryIcon category={category} />
        <InformationSection>
          <div>
            <Title>{title}</Title>
            <Duration>{renderedDuration}</Duration>
          </div>
          <AccomplishSection>
            {monsterCode ? (
              <b>{`${achievePercentage}%`}</b>
            ) : (
              <TodayHabitAccomplishCount id={habitId} />
            )}
          </AccomplishSection>
        </InformationSection>
      </div>
    </Container>
  );
};

HabitCardItem.propTypes = {
  habitId: PropTypes.number,
  monsterCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  durationStart: PropTypes.string.isRequired,
  durationEnd: PropTypes.string.isRequired,
  achievePercentage: PropTypes.number,
};

const Container = styled.div`
  display: flex;
  width: 100%;

  & > div {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

const CategoryIcon = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 5px;
  background-image: url(${({ category }) => CategoryImage[category].src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const InformationSection = styled.div`
  width: calc(100% - 43px);
  flex: 1;
  display: flex;
  justify-content: space-between;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

const Title = styled.span`
  font-size: var(--font-m);
  line-height: 19.2px;
  font-weight: var(--weight-bold);
  margin-bottom: 8px;
`;

const Duration = styled.p`
  font-size: var(--font-xxs);
  font-weight: var(--weight-regular);
  opacity: 0.6;
`;

const AccomplishSection = styled.div`
  font-family: var(--font-name-apple);
  font-size: var(--font-xs);
  font-weight: var(--weight-regular);
  line-height: 16.8px;
  color: var(--color-primary-deemed);
  display: flex;
  position: relative;
  top: 1px;

  & b {
    font-weight: var(--weight-semi-bold);
    color: var(--color-primary);
  }
`;

export default HabitCardItem;
