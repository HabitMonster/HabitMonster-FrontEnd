import React, { useState, useMemo, useCallback, memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import getDateList, {
  getCurrentKST,
  convertYMD,
  getPreviousMonth,
  getNextMonth,
  getRangeBetweenTwoDates,
} from '../../utils/date';

import { LeftIcon, RightIcon } from '../../assets/icons/common';
import { WEEK, ONE_WEEK } from '../../constants/date';

const NewHabitCalendar = ({ onClick }) => {
  const today = getCurrentKST();
  const [startDate, setStartDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);

  const test = getDateList(startDate);

  const startDateOfCurrentMonth = convertYMD(startDate)
    .split('-')
    .map((_, i) => (i === 2 ? '01' : _))
    .join('-');

  const movePreviousMonth = () =>
    setStartDate(new Date(getPreviousMonth(startDateOfCurrentMonth)));

  const moveNextMonth = () =>
    setStartDate(new Date(getNextMonth(startDateOfCurrentMonth)));

  const renderCurrentMonth = (dateString) => {
    const arr = dateString.split('-');
    return `${arr[0]}년 ${arr[1]}월`;
  };

  const renderDate = (dateString) => {
    const dd = dateString.split('-')[2];
    return Number(dd) < 10 ? dd[1] : dd;
  };

  const isCurrentMonth =
    convertYMD(today).split('-').slice(0, 2).join('-') ===
    convertYMD(startDate).split('-').slice(0, 2).join('-');

  const testing = (targetDate) => {
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
            <LeftIcon stroke="#f8f8f8" onClick={movePreviousMonth} />
          )}
        </div>
        <span>{renderCurrentMonth(convertYMD(startDate))}</span>
        <div>
          <RightIcon stroke="#f8f8f8" onClick={moveNextMonth} />
        </div>
      </CalendarMonthPicker>
      <CalendarRow>
        {WEEK.map(({ id, day }) => (
          <Days key={id}>{day}</Days>
        ))}
      </CalendarRow>
      {test.map((week, index) => (
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
              isInRange={testing(date.day)}
              onClick={() => handleDateButtonClick(date.day)}
            >
              {renderDate(date.day)}
            </Calendarcell>
          ))}
        </CalendarRow>
      ))}
      <SaveButtons>
        <button onClick={() => onClick({ type: 'cancel' })}>취소</button>
        <button onClick={() => onClick({ type: 'save', value: selectedDate })}>
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
  background: #1e2025;
  border-radius: 12px;
`;

const CalendarMonthPicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4e4e4e;
  margin-bottom: 17px;
  height: 48px;

  & div {
    width: 48px;
    height: 48px;
  }

  & span {
    font-weight: var(--weight-semi-regular);
    font-size: 18px;
    line-height: 22px;
    color: #f8f8f8;
  }
`;

const CalendarRow = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 0 5px;

  & div {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    border: none;

    &:first-child {
      color: #ef2f68;
    }
  }
`;

const Days = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #b3b3b3;
`;

const Calendarcell = styled.div`
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #f8f8f8;
  background: ${({ isInRange }) => (isInRange ? 'red' : 'none')};
  font-weight: var(--font-weight-semiBold);

  opacity: ${({ dimmed, disabled }) => (disabled ? '0.1' : dimmed ? '0.4' : 1)};
  cursor: pointer;
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
    display: flex;
    background: inherit;
    justify-content: center;
    align-items: center;
    font-size: var(--font-regular);
    font-weight: bold;
    line-height: 22px;
    color: #252525;
    cursor: pointer;
    border: none;

    &:first-child {
      color: #797979;
      border-right: 1px solid rgba(248, 248, 248, 0.1);
    }
  }
`;

export default memo(NewHabitCalendar);
