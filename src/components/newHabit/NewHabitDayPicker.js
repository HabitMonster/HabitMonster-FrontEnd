import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SubTitleOuter } from '../common';
import { WEEK } from '../../constants/date';
import { CheckIcon } from '../../assets/icons/habits';

import { toggleDay } from '../../utils/date';
import { setFontStyles, setFlexStyles } from '../../styles';

const NewHabitDayPicker = ({ days, onDayPicked, isEditMode }) => {
  const handleDayClick = (id) => {
    const newDays = toggleDay(days, id);
    onDayPicked(newDays);
  };

  const toggleAll = () => {
    onDayPicked(days.length === 7 ? '' : '1234567');
  };

  return (
    <SubTitleOuter subTitle="요일 설정">
      {isEditMode ? <HelperText>수정 불가능해요</HelperText> : ''}
      <Wrapper>
        <PresetList>
          {isEditMode
            ? WEEK.map(({ id, day }) => (
                <Item
                  onClick={null}
                  key={id}
                  selected={days.includes(String(id))}
                >
                  {day}
                </Item>
              ))
            : WEEK.map(({ id, day }) => (
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
            onClick={isEditMode ? null : toggleAll}
          />
          <span onClick={isEditMode ? null : toggleAll}>매일(모든 요일)</span>
        </ChoiceAllSection>
      </Wrapper>
    </SubTitleOuter>
  );
};

NewHabitDayPicker.propTypes = {
  isEditMode: PropTypes.bool,
  days: PropTypes.string.isRequired,
  onDayPicked: PropTypes.func,
};

const HelperText = styled.span`
  display: block;
  ${setFontStyles({
    color: 'primary-deemed',
    fontSize: 'xxs',
    lineHeight: '14px',
  })}
  margin-bottom: 6px;
`;

const Wrapper = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  })}
  width: 100%;
`;

const PresetList = styled.div`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'space-between',
  })}
  width: 100%;
  margin-bottom: 12px;
`;

const ChoiceAllSection = styled.div`
  width: 100%;
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'flex-end',
  })}

  & span {
    display: block;
    margin-left: 4px;
    margin-bottom: 18px;
    ${({ allSelected }) =>
      setFontStyles({
        customColor: allSelected
          ? 'var(--bg-selected-light)'
          : 'rgba(248, 248, 248, 0.5)',
        fontSize: 'xs',
        fontWeight: 'regular',
        lineHeight: '17px',
      })}
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
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  margin-right: 5px;
  ${({ selected }) =>
    setFontStyles({
      color: selected ? 'primary' : 'primary-deemed',
      fontSize: 'xs',
      lineHeight: '17px',
    })}
  cursor: pointer;

  transition: all 150ms ease-out;
`;

export default memo(NewHabitDayPicker);
