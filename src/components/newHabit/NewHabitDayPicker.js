import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SubTitleOuter } from '../common';
import { WEEK } from '../../constants/date';
import { CheckIcon } from '../../assets/icons/habits';

import { toggleDay } from '../../utils/date';

const NewHabitDayPicker = ({ days, onDayPicked }) => {
  const handleDayClick = (id) => {
    const newDays = toggleDay(days, id);
    onDayPicked(newDays);
  };

  const toggleAll = () => {
    onDayPicked(days.length === 7 ? '' : '1234567');
  };

  return (
    <SubTitleOuter subTitle="요일 설정">
      <Wrapper>
        <PresetList>
          {WEEK.map(({ id, day }) => (
            <Item
              onClick={() => handleDayClick(id)}
              key={id}
              selected={days.includes(String(id))}
            >
              {day}
            </Item>
          ))}
        </PresetList>
        <ChoiceAllSection allSelected={days.length === 7}>
          <CheckIcon
            opacity={days.length === 7 ? '1' : '0.5'}
            stroke={
              days.length === 7
                ? 'var(--bg-selected-light)'
                : 'var(--color-primary)'
            }
            onClick={toggleAll}
          />
          <span onClick={toggleAll}>매일(모든 요일)</span>
        </ChoiceAllSection>
      </Wrapper>
    </SubTitleOuter>
  );
};

NewHabitDayPicker.propTypes = {
  days: PropTypes.string.isRequired,
  onDayPicked: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 310px;
`;

const PresetList = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const ChoiceAllSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  & span {
    display: block;
    margin-left: 4px;
    margin-bottom: 18px;
    color: ${({ allSelected }) =>
      allSelected ? 'var(--bg-selected-light)' : 'rgba(248, 248, 248, 0.5)'};
    font-weight: var(--weight-regular);
    font-size: var (--font-xs);
    line-height: 17px;
    cursor: pointer;
    transition: all 150ms ease-out;
  }
`;

const Item = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 30px;
  border: ${({ selected }) =>
    selected ? 'none' : '1px solid var(--color-title)'};
  background: ${({ selected }) => (selected ? 'var(--bg-selected)' : 'none')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-xs);
  line-height: 17px;
  margin-right: 5px;
  color: ${({ selected }) =>
    selected ? 'var(--color-primary)' : 'rgba(248, 248, 248, 0.5)'};
  cursor: pointer;

  transition: all 150ms ease-out;
`;

export default memo(NewHabitDayPicker);
