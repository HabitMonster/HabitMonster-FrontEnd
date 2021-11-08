import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getDateList, {
  getNextMonth,
  getPreviousMonth,
  convertYMD,
  getCurrentKST,
} from '../../utils/date';

import { LeftIcon, RightIcon } from '../../assets/icons/common';

const NewHabitDateRangePicker = ({ onClick = () => {} }) => {
  const [startDate, setStartDate] = useState(getCurrentKST());
  const [[row1, row2, row3, row4, row5, row6], setDates] = useState(
    getDateList(startDate),
  );

  const startDateOfCurrentMonth = convertYMD(startDate)
    .split('-')
    .map((_, i) => (i === 2 ? '01' : _))
    .join('-');

  const [fromDate, setFromDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handlePreviousButtonClick = () => {
    const startDateOfPreviousMonth = getPreviousMonth(startDateOfCurrentMonth);
    setDates(getDateList(new Date(startDateOfPreviousMonth)));
    setStartDate(new Date(startDateOfPreviousMonth));
  };

  const handleNextButtonClick = () => {
    const startDateOfNextMonth = getNextMonth(startDateOfCurrentMonth);
    setDates(getDateList(new Date(startDateOfNextMonth)));
    setStartDate(new Date(startDateOfNextMonth));
  };

  const handleDateClick = (selectedDate) => {
    if (fromDate && endDate) {
      setFromDate(selectedDate);
      setEndDate(null);
      return;
    }

    if (!fromDate) {
      setFromDate(selectedDate);
      return;
    }

    setEndDate(selectedDate);
  };

  const checkDateRange = (targetDate) => {
    if (!fromDate && !endDate) {
      return false;
    }

    if (!endDate) {
      return (
        Date.parse(new Date(fromDate)) === Date.parse(new Date(targetDate))
      );
    }

    if (fromDate && endDate) {
      return (
        Date.parse(new Date(fromDate)) <= Date.parse(new Date(targetDate)) &&
        Date.parse(new Date(targetDate)) <= Date.parse(new Date(endDate))
      );
    }
  };

  const renderCurrentMonth = (dateString) => {
    const arr = dateString.split('-');
    return `${arr[0]}년 ${arr[1]}월`;
  };

  const renderDate = (dateString) => {
    const dd = dateString.split('-')[2];
    return Number(dd) < 10 ? dd[1] : dd;
  };

  return (
    <CalenderWrapper>
      <CalendarHelperText>시작일과 마감일을 정해주세요.</CalendarHelperText>
      <CalendarMonthPicker>
        <LeftIcon onClick={handlePreviousButtonClick} />
        <span>{renderCurrentMonth(convertYMD(startDate))}</span>
        <RightIcon onClick={handleNextButtonClick} />
      </CalendarMonthPicker>
      <CalendarRow>
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </CalendarRow>
      <CalendarRow>
        {row1.map((date) => (
          <Calendarcell
            data-date={date.day}
            disabled={date.disabled}
            dimmed={date.dimmed}
            key={date.day}
            isSelected={checkDateRange(date.day)}
            onClick={() => handleDateClick(date.day)}
          >
            {renderDate(date.day)}
          </Calendarcell>
        ))}
      </CalendarRow>
      <CalendarRow>
        {row2.map((date) => (
          <Calendarcell
            data-date={date.day}
            disabled={date.disabled}
            dimmed={date.dimmed}
            key={date.day}
            isSelected={checkDateRange(date.day)}
            onClick={() => handleDateClick(date.day)}
          >
            {renderDate(date.day)}
          </Calendarcell>
        ))}
      </CalendarRow>
      <CalendarRow>
        {row3.map((date) => (
          <Calendarcell
            data-date={date.day}
            disabled={date.disabled}
            dimmed={date.dimmed}
            key={date.day}
            isSelected={checkDateRange(date.day)}
            onClick={() => handleDateClick(date.day)}
          >
            {renderDate(date.day)}
          </Calendarcell>
        ))}
      </CalendarRow>
      <CalendarRow>
        {row4.map((date) => (
          <Calendarcell
            data-date={date.day}
            disabled={date.disabled}
            dimmed={date.dimmed}
            key={date.day}
            isSelected={checkDateRange(date.day)}
            onClick={() => handleDateClick(date.day)}
          >
            {renderDate(date.day)}
          </Calendarcell>
        ))}
      </CalendarRow>
      <CalendarRow>
        {row5.map((date) => (
          <Calendarcell
            data-date={date.day}
            disabled={date.disabled}
            dimmed={date.dimmed}
            key={date.day}
            isSelected={checkDateRange(date.day)}
            onClick={() => handleDateClick(date.day)}
          >
            {renderDate(date.day)}
          </Calendarcell>
        ))}
      </CalendarRow>
      <CalendarRow>
        {row6.map((date) => (
          <Calendarcell
            data-date={date.day}
            disabled={date.disabled}
            dimmed={date.dimmed}
            key={date.day}
            isSelected={checkDateRange(date.day)}
            onClick={() => handleDateClick(date.day)}
          >
            {renderDate(date.day)}
          </Calendarcell>
        ))}
      </CalendarRow>
      <SaveButtons>
        <button onClick={() => onClick('cancel')}>취소</button>
        <button onClick={() => onClick('save', [fromDate, endDate])}>
          완료
        </button>
      </SaveButtons>
    </CalenderWrapper>
  );
};

NewHabitDateRangePicker.propTypes = {
  onClick: PropTypes.func,
};

const CalenderWrapper = styled.div`
  background: var(--color-white);
  width: 343px;
  padding-top: 26px;
  padding-bottom: 16px;
  text-align: center;
  border-radius: 10px;
`;

const CalendarHelperText = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: var(--font-small);
  line-height: 19px;
  color: var(--color-black);
  margin: 0 auto;
  margin-bottom: 35px;
  text-align: center;
`;

const CalendarMonthPicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4e4e4e;
  margin-bottom: 17px;
  height: 48px;
  padding: 0 21px;

  & span {
    font-weight: var(--weight-semi-regular);
    font-size: var(--font-regular);
    line-height: 22px;
  }
`;

const CalendarRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  width: 281px;
  margin: 0 auto;
  font-size: var(--font-nano);
  line-height: 14px;
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
      color: #e57ad9;
    }
    &:last-child {
      color: #65b2ee;
    }
  }
`;

const Calendarcell = styled.div`
  font-size: var(--font-small);
  text-align: center;
  line-height: 19.2px;

  background: ${({ isSelected }) => (isSelected ? '#7075fc' : 'none')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#252525')};
  opacity: ${({ dimmed, disabled }) => (disabled ? '0.1' : dimmed ? '0.4' : 1)};
  cursor: pointer;

  &:first-child {
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#e57ad9')} !important;
  }
  &:last-child {
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#65b2ee')} !important;
  }
`;

const SaveButtons = styled.div`
  width: 281px;
  display: flex;
  margin: auto;
  margin-top: 21px;

  & button {
    width: 50%;
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
      border-right: 1px solid #d5d5d5;
    }
  }
`;

export default NewHabitDateRangePicker;
