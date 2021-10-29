/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import styled from 'styled-components';

const CalendarInput = forwardRef(({ onClick, isStart }, ref) => (
  <StartDay onClick={onClick} ref={ref}>
    {isStart ? '시작일 선택' : '종료일 선택'}
  </StartDay>
));

const StartDay = styled.div`
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
`;

export default CalendarInput;
