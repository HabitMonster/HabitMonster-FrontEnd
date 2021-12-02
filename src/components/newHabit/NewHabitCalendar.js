import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LeftIcon, RightIcon } from '../../assets/icons/common';

import { WEEK, ONE_WEEK } from '../../constants/date';

import { setFontStyles, setFlexStyles } from '../../styles';

import getDateList, {
  getCurrentKST,
  convertYMD,
  getPreviousMonth,
  getNextMonth,
  getRangeBetweenTwoDates,
} from '../../utils/date';

const NewHabitCalendar = ({ onClick }) => {
  const today = getCurrentKST();
  const [startDate, setStartDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);

  const dates = getDateList(startDate);

  const startDateOfCurrentMonth = convertYMD(startDate)
    .split('-')
    .map((_, i) => (i === 2 ? '01' : _))
    .join('-');

  const isCurrentMonth =
    convertYMD(today).split('-').slice(0, 2).join('-') ===
    convertYMD(startDate).split('-').slice(0, 2).join('-');

  const movePreviousMonth = () => {
    setStartDate(new Date(getPreviousMonth(startDateOfCurrentMonth)));
  };

  const moveNextMonth = () =>
    setStartDate(new Date(getNextMonth(startDateOfCurrentMonth)));

  const getRange = () =>
    getRangeBetweenTwoDates(convertYMD(today), selectedDate);

  const renderHelperText = () => {
    if (!selectedDate || getRange() < 7) {
      return null;
    }
    return `오늘부터 ${getRange()}일동안 진행합니다.`;
  };

  const renderCurrentMonth = (dateString) => {
    const arr = dateString.split('-');
    return `${arr[0]}년 ${arr[1]}월`;
  };

  const renderDate = (dateString) => {
    const dd = dateString.split('-')[2];
    return Number(dd) < 10 ? dd[1] : dd;
  };

  const checkDateRange = (targetDate) => {
    if (!selectedDate) {
      return false;
    }

    return (
      Date.parse(convertYMD(today)) <= Date.parse(targetDate) &&
      Date.parse(targetDate) <= Date.parse(selectedDate)
    );
  };

  const handleDateButtonClick = (currentDate) => {
    if (
      Date.parse(currentDate) <= Date.parse(convertYMD(today)) ||
      getRangeBetweenTwoDates(convertYMD(today), currentDate) < ONE_WEEK
    ) {
      return null;
    }

    setSelectedDate(currentDate);
  };

  return (
    <CalenderWrapper>
      <CalendarMonthPicker>
        <div>
          {!isCurrentMonth && (
            <LeftIcon
              stroke="var(--color-primary)"
              onClick={movePreviousMonth}
            />
          )}
        </div>
        <span>{renderCurrentMonth(convertYMD(startDate))}</span>
        <div>
          <RightIcon stroke="var(--color-primary)" onClick={moveNextMonth} />
        </div>
      </CalendarMonthPicker>
      <CalendarRow className="week">
        {WEEK.map(({ id, day }) => (
          <Days key={id}>{day}</Days>
        ))}
      </CalendarRow>
      {dates.map((week, index) => (
        <CalendarRow key={`week-${index + 1}`}>
          {week.map((date) => (
            <Calendarcell
              data-date={date.day}
              disabled={date.disabled}
              dimmed={date.dimmed}
              key={date.day}
              isTarget={
                selectedDate === date.day || date.day === convertYMD(today)
              }
              isStartDate={date.day === convertYMD(today)}
              isEndDate={selectedDate === date.day}
              isInRange={checkDateRange(date.day)}
              onClick={() => handleDateButtonClick(date.day)}
            >
              <div>
                <div>{renderDate(date.day)}</div>
              </div>
            </Calendarcell>
          ))}
        </CalendarRow>
      ))}
      <HelperText>{renderHelperText()}</HelperText>
      <SaveButtons>
        <button onClick={() => onClick({ type: 'cancel' })}>취소</button>
        <button
          disabled={!Boolean(selectedDate)}
          onClick={() => onClick({ type: 'save', value: selectedDate })}
        >
          완료
        </button>
      </SaveButtons>
    </CalenderWrapper>
  );
};

NewHabitCalendar.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

const CalenderWrapper = styled.div`
  background: var(--color-white);
  width: 312px;
  text-align: center;
  background: var(--bg-primary);
  border-radius: var(--border-radius-mideum);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CalendarMonthPicker = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}

  color: #4e4e4e;
  margin-bottom: 17px;
  height: 48px;
  padding-top: 12px;

  & div {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }

  & span {
    ${setFontStyles({
      color: 'primary',
      fontSize: 'l',
      fontWeight: 'semi-regular',
      lineHeight: '22px',
    })}
  }
`;

const CalendarRow = styled.div`
  width: 100%;
  margin: 0 auto;
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'space-around',
  })}
  margin-bottom: 6px;

  &.week {
    margin-bottom: 12px;
  }

  & > div:first-child {
    color: var(--color-danger);
  }
`;

const Days = styled.div`
  ${setFontStyles({
    customColor: '#b3b3b3',
    fontSize: 'xxs',
    lineHeight: '14px',
  })}
`;

const Calendarcell = styled.div`
  width: 100%;
  height: 36px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  ${setFontStyles({
    color: 'primary',
    fontSize: 'm',
    fontWeight: 'semi-bold',
    lineHeight: '19px',
  })}
  text-align: center;
  background: ${({ isStartDate, isEndDate, isInRange }) =>
    !isInRange && isStartDate
      ? 'none'
      : isStartDate
      ? 'linear-gradient(to left, var(--bg-selected) 50%, transparent 50%)'
      : isEndDate
      ? 'linear-gradient(to right, var(--bg-selected) 50%, transparent 50%)'
      : isInRange
      ? 'var(--bg-selected)'
      : 'none'};

  opacity: ${({ dimmed, disabled }) => (disabled ? '0.5' : dimmed ? '0.5' : 1)};
  cursor: pointer;

  transition: all 150ms ease-in;

  & div {
    width: 36px;
    height: 36px;
    ${setFlexStyles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })}
    border-radius: ${({ isTarget }) => (isTarget ? '50%' : '0px')};
    background: ${({ isTarget }) => (isTarget ? 'var(--bg-active)' : 'none')};
    transition: all var(--animation-duration) ease-in;
  }
`;

const HelperText = styled.span`
  display: block;
  width: 100%;
  margin: 24px 0px;
  padding: 0 16px;
  text-align: left;
  ${({ isError }) =>
    setFontStyles({
      customColor: isError ? 'var(--color-danger)' : 'rgba(248, 248, 248, 0.8)',
      fontSize: 's',
    })}
`;

const SaveButtons = styled.div`
  width: 100%;
  height: 53px;
  display: flex;
  margin: auto;
  margin-top: 21px;
  border-top: 1px solid rgba(248, 248, 248, 0.1);

  & button {
    width: 50%;
    height: 100%;
    ${setFlexStyles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })}
    background: inherit;
    ${setFontStyles({
      color: 'primary',
      fontSize: 'm',
      fontWeight: 'bold',
      lineHeight: '22px',
    })}
    cursor: pointer;
    border: none;

    &:first-child {
      border-right: 1px solid rgba(248, 248, 248, 0.1);
    }

    &:disabled {
      ${setFontStyles({ color: 'primary-deemed' })}
    }
  }
`;

export default memo(NewHabitCalendar);
