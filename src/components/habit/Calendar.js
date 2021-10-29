import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import styled from 'styled-components';

import ko from 'date-fns/locale/ko';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';

import 'react-datepicker/dist/react-datepicker.css';
import './calender.css';

import CalendarInput from './CalendarInput';
import { LeftIcon, RightIcon } from '../../assets/icons/common';

import { getDay, createDate } from '../../utils/date';

registerLocale('ko', ko);

const MONTH = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const Calendar = ({ isStart }) => {
  const [startDate, setStartDate] = useState(new Date());
  const calendarReference = useRef(null);
  return (
    <DatePicker
      ref={calendarReference}
      withPortal
      locale={ko}
      selected={startDate}
      minDate={new Date()}
      dayClassName={(date) =>
        getDay(createDate(date)) === '토'
          ? 'saturday'
          : getDay(createDate(date)) === '일'
          ? 'sunday'
          : undefined
      }
      onChange={(date) => {
        console.log(date);
        setStartDate(date);
      }}
      customInput={<CalendarInput isStart={isStart} />}
      renderCustomHeader={({
        date,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        decreaseMonth,
        increaseMonth,
      }) => (
        <>
          <CalenderTitle>시작일과 마감일을 정해주세요</CalenderTitle>
          <CalenderHeaderWrapper>
            <CalenderIconWrapper
              disabled={prevMonthButtonDisabled}
              onClick={decreaseMonth}
            >
              <LeftIcon />
            </CalenderIconWrapper>
            <div
              style={{
                flexGrow: '1',
                fontSize: '18px',
                lineHeight: '22px',
                color: '#686868',
              }}
            >
              {getYear(date)}년 {MONTH[getMonth(date)]}
            </div>
            <CalenderIconWrapper
              disabled={nextMonthButtonDisabled}
              onClick={increaseMonth}
            >
              <RightIcon />
            </CalenderIconWrapper>
            <CalendarSaveButtonWrapper>
              <button>취소</button>
              <button>완료</button>
            </CalendarSaveButtonWrapper>
          </CalenderHeaderWrapper>
        </>
      )}
    />
  );
};

Calendar.propTypes = {
  isStart: PropTypes.bool,
};

Calendar.defaultProps = {
  isStart: false,
};

const CalenderTitle = styled.p`
  width: 193px;
  height: 19px;
  font-size: 16px;
  line-height: 19px;
  color: #000;
  font-weight: bold;
  margin: 13px auto 17px;
`;

const CalenderHeaderWrapper = styled.div`
  width: 100%;
  height: 28px;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

const CalenderIconWrapper = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const CalendarSaveButtonWrapper = styled.div`
  position: absolute;
  bottom: -4%;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-around;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 60px;

  & button {
    border: none;
    background: none;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
  }

  & > button:first-child {
    color: #797979;
  }
`;

export default Calendar;
