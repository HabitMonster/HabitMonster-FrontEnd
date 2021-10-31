import React, { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import styled from 'styled-components';

import ko from 'date-fns/locale/ko';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';

import 'react-datepicker/dist/react-datepicker.css';
import './calender.css';

import CalenderInput from './CalenderInput';
import { LeftIcon, RightIcon } from '../../assets/icons/common';

import { getDay, createDate, convertYYYYMMDD } from '../../utils/date';

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

const Calender = ({ isStart, onDateChosen }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const calenderReference = useRef(null);

  const cancel = () => {
    setStartDate(currentDate);
    calenderReference.current.setOpen(false);
  };

  const close = () => {
    setCurrentDate(startDate);
    onDateChosen(convertYYYYMMDD(startDate));
    calenderReference.current.setOpen(false);
  };

  /*명세
   ** ref: 해당 reference의 setOpen기능을 사용하기 위해 주었습니다.
   ** withPortal: 리액트 포탈을 사용하여 모달 형식으로 달력을 띄웁니다.
   ** selected: 유저가 선택한 date 객체가 들어갑니다.
   ** minDate: 달력의 시작일(disabled 분기)
   ** dayClassName: 해당 함수의 리턴값에 따라서 추가적으로 클래스 네임을 부여해줍니다. 토요일과 일요일에 대해 색깔을 입히기 위해 사용하였어요.
   ** 헬퍼 함수 getDay, createDate를 만들었습니다.
   ** onChange: 유저가 달력의 날짜를 선택했을 때 트리거되는 콜백입니다. 인자로 선택한 Date 객체가 들어갑니다.
   ** shouldCloseOnSelect: 모달의 기본 용도와 다르게 뷰에서 완료 버튼을 눌러야지만 모달이 닫혀야합니다. 그래서 해당 값을 false로 주었습니다.
   ** fixedHeight: 이 라이브러리는 동적으로 height을 변화시키는데, 그걸 방지하려고 해당 prop을 사용하였습니다.
   ** customInput: 이 라이브러리의 기본 behavior를 막고 시작일 선택, 종료일 선택을 누르면 달력이 뜨게끔 구현을 하고싶었습니다. 따라서 커스터마이징하기위해 사용했습니다.
   ** renderCustomHeader: 달력에서 보여주는 Header를 커스터마이징하기 위해 사용했습니다.
   ** calender.css: 달력 전체의 css를 오버라이딩하기위해 사용했습니다.
   */

  return (
    <DatePicker
      ref={calenderReference}
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
      onChange={(date) => setStartDate(date)}
      shouldCloseOnSelect={false}
      fixedHeight={true}
      customInput={<CalenderInput isStart={isStart} />}
      renderCustomHeader={({
        date,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        decreaseMonth,
        increaseMonth,
      }) => {
        return (
          <>
            <CalenderTitle>
              {isStart ? '시작일' : '종료일'}을 정해주세요
            </CalenderTitle>
            <CalenderHeaderWrapper>
              <CalenderIconWrapper
                disabled={prevMonthButtonDisabled}
                onClick={decreaseMonth}
              >
                <LeftIcon />
              </CalenderIconWrapper>
              <CalendarDateViewer>
                {getYear(date)}년 {MONTH[getMonth(date)]}
              </CalendarDateViewer>
              <CalenderIconWrapper
                disabled={nextMonthButtonDisabled}
                onClick={increaseMonth}
              >
                <RightIcon />
              </CalenderIconWrapper>
              <CalendarSaveButtonWrapper>
                <button onClick={() => cancel()}>취소</button>
                <button onClick={() => close()}>완료</button>
              </CalendarSaveButtonWrapper>
            </CalenderHeaderWrapper>
          </>
        );
      }}
    />
  );
};

Calender.propTypes = {
  isStart: PropTypes.bool,
  onDateChosen: PropTypes.func.isRequired,
};

Calender.defaultProps = {
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

const CalendarDateViewer = styled.div`
  flex-grow: 1;
  font-size: 18px;
  line-height: 22px;
  color: #686868;
`;

const CalendarSaveButtonWrapper = styled.div`
  position: absolute;
  bottom: -55px;
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

export default memo(Calender);
