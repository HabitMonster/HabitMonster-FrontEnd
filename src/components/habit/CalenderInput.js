/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import styled from 'styled-components';

const CalenderInput = forwardRef(({ onClick, isStart }, ref) => {
  return (
    <ChoiceText onClick={onClick} ref={ref}>
      {isStart ? '시작일 선택' : '종료일 선택'}
    </ChoiceText>
  );
});

CalenderInput.displayName = '달력';

const ChoiceText = styled.div`
  font-size: var(--font-small);
  line-height: 19px;
  font-weight: var(--weight-semi-bold);
  cursor: pointer;
`;

export default CalenderInput;
