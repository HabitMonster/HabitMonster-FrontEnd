import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CategoryImage from '../../assets/images/category';

import { TodayHabitAccomplishCount } from '.';

import { setFontStyles, setFlexStyles } from '../../styles';

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
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'space-between',
  })}

  & > div:first-child {
    ${setFlexStyles({
      display: 'flex',
      flexDirection: 'column',
    })}

    flex: 1;
  }
`;

const Title = styled.span`
  ${setFontStyles({
    fontSize: 'm',
    fontWeight: 'bold',
    lineHeight: '19.2px',
  })}
  margin-bottom: 8px;
`;

const Duration = styled.p`
  ${setFontStyles({
    fontSize: 'xxs',
    fontWeight: 'regular',
  })}
  opacity: 0.6;
`;

const AccomplishSection = styled.div`
  ${setFontStyles({
    color: 'primary-deemed',
    fontSize: 'xs',
    fontWeight: 'regular',
    lineHeight: '16.8px',
  })}
  display: flex;
  position: relative;
  top: 1px;

  & b {
    ${setFontStyles({
      color: 'primary',
      fontSize: 'xs',
    })}
  }
`;

export default memo(HabitCardItem);
